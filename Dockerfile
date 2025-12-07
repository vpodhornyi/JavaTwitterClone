# ==== build stage ====
FROM eclipse-temurin:23-jdk AS build

WORKDIR /app

COPY pom.xml .
COPY checkstyle_config.xml ./

RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -Pprod -B clean package -DskipTests


# ==== runtime stage ====
FROM eclipse-temurin:23-jdk

WORKDIR /app

ENV JAVA_OPTS="-Xms256m -Xmx512m"

COPY --from=build /app/target/*.war app.war

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.war"]