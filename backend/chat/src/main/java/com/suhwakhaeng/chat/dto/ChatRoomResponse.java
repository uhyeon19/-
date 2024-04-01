package com.suhwakhaeng.chat.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ChatRoomResponse(
        String chatRoomId,
        String nickname
) {
}
