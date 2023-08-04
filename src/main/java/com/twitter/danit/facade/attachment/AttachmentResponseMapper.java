package com.twitter.danit.facade.attachment;

import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.dto.attachment.AttachmentResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class AttachmentResponseMapper extends GeneralFacade<AttachmentImage, AttachmentResponse> {
  public AttachmentResponseMapper() {
    super(AttachmentImage.class, AttachmentResponse.class);
  }

  @Override
  public void decorateEntity(AttachmentImage entity, AttachmentResponse dto) {

  }
}
