FROM gradle:8.5.0-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/project
WORKDIR /home/gradle/project
RUN gradle clean build -x test --no-daemon

FROM openjdk:17-jdk-slim
COPY --from=build /home/gradle/project/build/libs/QUIZ-APP-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8082
