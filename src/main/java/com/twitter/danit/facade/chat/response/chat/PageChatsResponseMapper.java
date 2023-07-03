package com.twitter.danit.facade.chat.response.chat;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.ChatType;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.chat.PageChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PageChatsResponseMapper {
  private final PrivateChatResponseMapper privateChatResponseMapper;
  private final GroupChatResponseMapper groupChatResponseMapper;

  public PageChatResponse convertToDto(Page<Chat> entity, User user) {
    PageChatResponse dto = new PageChatResponse();
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Chat> chats = entity.getContent();

    if (chats.size() > 0) {
      dto.setElements(chats.stream().map(ch -> {
        if (ch.getType().equals(ChatType.PRIVATE)) {
          return privateChatResponseMapper.convertToDto(ch, user);
        }
        return groupChatResponseMapper.convertToDto(ch, user);
      }).toList());
    }
    return dto;
  }
}
