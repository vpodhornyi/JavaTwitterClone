package com.twitter.danit.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable<T> {
  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  private T createdBy;

  @CreatedDate
  @Column(name = "created_at", nullable = false)
  private Date createdAt;

  @LastModifiedBy
  @Column(name = "updated_by", updatable = false, nullable = false)
  private T updatedBy;

  @LastModifiedDate
  @Column(name = "updated_at", nullable = false)
  private Date updatedAt;
}
