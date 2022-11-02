package com.twitter.danit.domain.error;

public record ValidationError(String field, String message) {
}
