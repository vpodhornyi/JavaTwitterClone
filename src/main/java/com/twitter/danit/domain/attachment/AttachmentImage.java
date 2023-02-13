package com.twitter.danit.domain.attachment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.tweet.Tweet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;

@Entity
@Table(name = "attachment_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class AttachmentImage extends BaseEntity {

  private String imgUrl;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  @JsonIgnore
  private Tweet tweet;
}

