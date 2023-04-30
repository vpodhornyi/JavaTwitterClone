package com.twitter.danit.utils;

import java.util.Random;

public class Password {
  public static String getRandomPassword() {
    int passwordLength = 10;
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    Random random = new Random();

    return random.ints(leftLimit, rightLimit + 1)
      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
      .limit(passwordLength)
      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
      .toString()
      .toUpperCase();
  }
}
