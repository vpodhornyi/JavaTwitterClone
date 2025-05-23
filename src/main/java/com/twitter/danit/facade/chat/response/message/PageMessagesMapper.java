package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.ChatType;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.PageMessagesResponse;
import com.twitter.danit.service.MessageService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PageMessagesMapper {
  private final PagePrivateMessageOwnerResponseMapper privateMessageOwnerResponseMapper;
  private final PagePrivateForeignerMessageResponseMapper privateForeignerMessageResponseMapper;
  private final PageGroupMessageOwnerResponseMapper groupMessageOwnerResponseMapper;
  private final PageGroupForeignerMessageResponseMapper groupForeignerMessageResponseMapper;
  private final MessageService messageService;

  public PageMessagesMapper(PagePrivateMessageOwnerResponseMapper privateMessageOwnerResponseMapper,
                            PagePrivateForeignerMessageResponseMapper privateForeignerMessageResponseMapper,
                            PageGroupMessageOwnerResponseMapper groupMessageOwnerResponseMapper,
                            PageGroupForeignerMessageResponseMapper groupForeignerMessageResponseMapper,
                            MessageService messageService) {
    this.privateMessageOwnerResponseMapper = privateMessageOwnerResponseMapper;
    this.privateForeignerMessageResponseMapper = privateForeignerMessageResponseMapper;
    this.groupMessageOwnerResponseMapper = groupMessageOwnerResponseMapper;
    this.groupForeignerMessageResponseMapper = groupForeignerMessageResponseMapper;
    this.messageService = messageService;
  }

  public PageMessagesResponse convertToDto(Page<Message> entity, User user) {
    PageMessagesResponse dto = new PageMessagesResponse();
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Message> messages = entity.getContent();

    if (messages.size() > 0) {
      Message message = messages.get(0);
      ChatType type = message.getChat().getType();
      Chat chat = message.getChat();
      dto.setChatId(chat.getId());
      dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(user.getId(), chat.getId()));

      if (type.equals(ChatType.PRIVATE)) {
        messages.forEach(m -> {
          if (user.equals(m.getUser())) {
            dto.addElement(privateMessageOwnerResponseMapper.convertToDto(m, user));
          } else {
            dto.addElement(privateForeignerMessageResponseMapper.convertToDto(m, user));
          }
        });
      }

      if (type.equals(ChatType.GROUP)) {
        messages.forEach(m -> {
          if (user.equals(m.getUser())) {
            dto.addElement(groupMessageOwnerResponseMapper.convertToDto(m, user));
          } else {
            dto.addElement(groupForeignerMessageResponseMapper.convertToDto(m, user));
          }
        });
      }

      Collections.reverse(dto.getElements());
    }
    return dto;
  }
}
