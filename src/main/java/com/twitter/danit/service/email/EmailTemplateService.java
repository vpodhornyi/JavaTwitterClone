package com.twitter.danit.service.email;

import com.twitter.danit.domain.user.User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailTemplateService {
  private String loadTemplate(String fileName) {
    String path = "/email/" + fileName + ".html";

    try (InputStream is = getClass().getResourceAsStream(path)) {
      if (is == null) {
        throw new IllegalArgumentException("Template not found: " + path);
      }
      return new String(is.readAllBytes(), StandardCharsets.UTF_8);
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load email template: " + path, e);
    }
  }

  public String buildWelcomeTemplate(String username, String password) {
    String tpl = loadTemplate("welcome");
    return tpl
        .replace("{{USERNAME}}", username)
        .replace("{{PASSWORD}}", password);
  }

  public String buildNewPasswordTemplate(String username, String password) {
    String tpl = loadTemplate("new-password");
    return tpl
        .replace("{{USERNAME}}", username)
        .replace("{{PASSWORD}}", password);
  }
}

