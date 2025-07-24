FROM gradle:8.5-jdk17 AS builder
COPY . /home/app
WORKDIR /home/app
RUN gradle clean build --no-daemon

FROM openjdk:17-jdk-slim
COPY --from=builder /home/app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
