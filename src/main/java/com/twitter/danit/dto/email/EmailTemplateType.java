package com.twitter.danit.dto.email;

import com.twitter.danit.service.email.EmailTemplateService;

public enum EmailTemplateType {
  WELCOME("welcome") {
    @Override
    public String buildHtml(EmailTemplateService svc, EmailJob job) {
      return svc.buildWelcomeTemplate(job.getUsername(), job.getPassword());
    }
  },
  NEW_PASSWORD("new-password") {
    @Override
    public String buildHtml(EmailTemplateService svc, EmailJob job) {
      return svc.buildNewPasswordTemplate(job.getUsername(), job.getPassword());
    }
  };

  private final String fileName;

  EmailTemplateType(String fileName) {
    this.fileName = fileName;
  }

  public String fileName() {
    return fileName;
  }

  public abstract String buildHtml(EmailTemplateService svc, EmailJob job);
}
