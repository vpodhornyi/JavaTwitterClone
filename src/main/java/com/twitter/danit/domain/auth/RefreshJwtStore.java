package com.twitter.danit.domain.auth;

import com.twitter.danit.domain.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "refresh_jwt_store")
@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class RefreshJwtStore extends BaseEntity {

  @Column(nullable = false)
  private String login;
  @Column(nullable = false)
  private String refreshToken;
}
