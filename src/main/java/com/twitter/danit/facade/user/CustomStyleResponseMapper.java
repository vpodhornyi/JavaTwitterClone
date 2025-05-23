package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.dto.user.CustomStyleResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class CustomStyleResponseMapper extends GeneralFacade<CustomStyle, CustomStyleResponse> {
  public CustomStyleResponseMapper() {
    super(CustomStyle.class, CustomStyleResponse.class);
  }

  @Override
  protected void decorateDto(CustomStyleResponse dto, CustomStyle entity) {
    dto.setColor(entity.getColor().toString().toLowerCase());
    dto.setBackground(entity.getBackgroundColor().toString().toLowerCase());
  }
}
