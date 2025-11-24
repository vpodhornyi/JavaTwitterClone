# ==== build stage ====
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -B clean package -DskipTests


# ==== runtime stage ====
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

ENV JAVA_OPTS="-Xms256m -Xmx512m"

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]