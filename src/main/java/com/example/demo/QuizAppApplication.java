package com.example.demo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class QuizAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizAppApplication.class, args);
    }


    @EventListener(ApplicationReadyEvent.class)
    public void openBrowser() {
        try {
            Runtime.getRuntime().exec("cmd /c start http://localhost:8082/login.html");
        } catch (Exception e) {
            System.out.println("Failed to open browser: " + e.getMessage());
        }
    }
}