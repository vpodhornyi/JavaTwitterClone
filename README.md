# 🐦 Java Twitter Clone + Real-Time Chat

A full-featured Twitter clone built with **Java 17**, **Spring Boot**, **PostgreSQL**, and **RabbitMQ**, including a modern **React frontend** and **real-time messaging** over **WebSocket**.

---

## 🚀 Features

### 🧾 Core Social Features
- JWT-based authentication
- Create, like, and comment on tweets
- Follow and unfollow users
- Personalized tweet feed
- Notifications (in progress)

### 💬 Real-Time Chat
- 1-on-1 messaging using WebSocket + STOMP
- RabbitMQ-backed delivery
- Message routing via user queues
- Planned: message persistence, delivery receipts, group chats

---

## 🛠 Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Backend     | Java 17, Spring Boot                      |
| Frontend    | React, Redux, React router 6, Material UI |
| Database    | PostgreSQL                                |
| Auth        | Spring Security + JWT                     |
| Messaging   | RabbitMQ, Spring WebSocket + STOMP        |
| Build Tool  | Maven                                     |
| Project Mgmt| Trello                                    |

---