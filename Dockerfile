# 🏗️ Stage 1: Build the .jar file using Gradle
FROM gradle:8.5.0-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/project
WORKDIR /home/gradle/project
RUN gradle build --no-daemon

# 🚀 Stage 2: Run the built JAR using OpenJDK
FROM openjdk:17-jdk-slim
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
