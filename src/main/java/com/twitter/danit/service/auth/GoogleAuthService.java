package com.twitter.danit.service.auth;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.google.GoogleTokenResponse;
import com.twitter.danit.dto.auth.google.GoogleUserInfo;
import com.twitter.danit.facade.user.GoogleUserMapper;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.email.EmailJobPublisher;
import com.twitter.danit.utils.Password;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

  @Value("${spring.google.client-id}")
  private String clientId;

  @Value("${spring.google.client-secret}")
  private String clientSecret;

  @Value("${spring.google.redirect-url}")
  private String redirectUri;

  private final RestTemplate restTemplate = new RestTemplate();

  private final UserService userService;
  private final GoogleUserMapper googleUserMapper;
  private final PasswordEncoder passwordEncoder;
  private final EmailJobPublisher emailJobPublisher;

  public String buildGoogleAuthorizationUrl() {
    String encodedRedirect = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
    String encodedScope = URLEncoder.encode("openid email profile", StandardCharsets.UTF_8);

    return "https://accounts.google.com/o/oauth2/v2/auth" + "?client_id=" + clientId +
        "&redirect_uri=" + encodedRedirect +
        "&response_type=code" +
        "&scope=" + encodedScope +
        "&access_type=offline" +
        "&prompt=consent";
  }

  public User handleCallback(String code) {
    GoogleTokenResponse tokens = exchangeCodeForTokens(code);
    GoogleUserInfo info = fetchUserInfo(tokens.getAccessToken());
    return findOrCreateUserFromGoogle(info);
  }

  private GoogleTokenResponse exchangeCodeForTokens(String code) {
    String url = "https://oauth2.googleapis.com/token";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    body.add("code", code);
    body.add("client_id", clientId);
    body.add("client_secret", clientSecret);
    body.add("redirect_uri", redirectUri);
    body.add("grant_type", "authorization_code");

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

    ResponseEntity<GoogleTokenResponse> response =
        restTemplate.postForEntity(url, request, GoogleTokenResponse.class);

    if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
      throw new RuntimeException("Failed to exchange code for tokens");
    }

    return response.getBody();
  }

  private GoogleUserInfo fetchUserInfo(String accessToken) {
    String url = "https://www.googleapis.com/oauth2/v2/userinfo";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<Void> request = new HttpEntity<>(headers);

    ResponseEntity<GoogleUserInfo> response =
        restTemplate.exchange(url, HttpMethod.GET, request, GoogleUserInfo.class);

    if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
      throw new RuntimeException("Failed to fetch user info from Google");
    }

    return response.getBody();
  }

  private User findOrCreateUserFromGoogle(GoogleUserInfo info) {
    return userService.findByEmail(info.getEmail())
        .orElseGet(() -> {
          User user = googleUserMapper.convertToEntity(info);
          String password = Password.getRandomPassword();
          user.setPassword(passwordEncoder.encode(password));
          user.setUserTag(userService.generateUserTag(info.getName()));
          userService.save(user);
          emailJobPublisher.publishWelcomeEmail(user, password);
          return user;
        });
  }
}
