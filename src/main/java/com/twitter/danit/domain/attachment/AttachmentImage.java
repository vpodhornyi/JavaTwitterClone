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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "attachment_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttachmentImage extends BaseEntity {

  private String imgUrl;


  @JoinColumn(name = "tweet_id")
  @JsonIgnore
  @ManyToOne
  private Tweet tweet;
}
