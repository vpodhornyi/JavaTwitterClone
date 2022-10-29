package com.twitter.danit.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.tweet.Tweet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

  private String name;

  @Column(unique = true, nullable = false)
  @NotBlank
  private String userTag;

  @Column(unique = true, nullable = false)
  @NotBlank
  private String email;

  @Column(nullable = false)
  @NotBlank
  private String password;
  private Date birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;

  @OneToMany
  @JoinColumn(name = "user_id")
  private Set<Tweet> tweets;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers",
    joinColumns = @JoinColumn(name = "followed_id"),
    inverseJoinColumns = @JoinColumn(name = "follower_id"))
  @JsonIgnore
  private Set<User> followers;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToMany
  @JoinTable(name = "followers",
    joinColumns = @JoinColumn(name = "follower_id"),
    inverseJoinColumns = @JoinColumn(name = "followed_id"))
  @JsonIgnore
  private Set<User> followings;

  @ManyToMany
  private Set<Chat> chats;

  public User(String userTag, String email, String password) {
    this.userTag = userTag;
    this.email = email;
    this.password = password;
  }
}
