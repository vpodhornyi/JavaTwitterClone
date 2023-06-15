package com.twitter.danit.dto.attachment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttachmentResponse {
  private Long id;
  private String imgUrl;
  private String key;
}
