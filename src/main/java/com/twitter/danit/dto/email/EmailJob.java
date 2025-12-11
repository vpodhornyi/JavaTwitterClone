package com.twitter.danit.dto.email;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailJob {
  private String to;
  private String subject;
  private EmailTemplateType templateType;
  private String username;
  private String password;
}
