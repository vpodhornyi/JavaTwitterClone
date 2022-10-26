package com.twitter.danit.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@MappedSuperclass
@Getter
@NoArgsConstructor
public abstract class BaseEntity extends Auditable<String> implements Serializable {
  @NotNull
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false, updatable = false)
  private Long id;

  public void setId(Long id) {
    this.id = id;
  }
}
