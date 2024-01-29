package com.twitter.danit.service.email;

import com.twitter.danit.domain.user.User;
import lombok.Getter;

public class Email {
  private static final String welcome = """
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .container {
            padding: 20px;
            width: 300px;
            font-family: TwitterChirp,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
        }

        .password_container {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .password {
            padding: 15px;
            border-radius: 20px;
            background-color: #2196f3;
            font-weight: 600;
            color: white;
            font-size: 19px;
            letter-spacing: 1px;
            margin: 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <h3>Hello, welcome to Twitter!</h3>
    <p>Your nickname is:</p>
    <p>%s</p>
    <p>Your password is:</p>
    <div class="password_container">
        <p class="password">%s</p>
    </div>
</div>
</body>
</html>\s
      """;

  public static String getWelcomeHtml(String password, User user) {
    return String.format(welcome, user.getUserTag(), password);
  }
}
