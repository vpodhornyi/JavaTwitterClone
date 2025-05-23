package com.twitter.danit.dto.error;

public record ValidationError(String field, String message) {
}
