package com.example.demo.controller;

import com.example.demo.model.question;
import com.example.demo.model.quiz;
import com.example.demo.respository.quizrepository;
import com.example.demo.service.questionservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "*")
public class questioncontroller {

    @Autowired
    private questionservice questionService;

    @Autowired
    private quizrepository quizRepository;

    @PostMapping("/{quizId}/questions")
    public ResponseEntity<?> addQuestionToQuiz(@PathVariable("quizId") Long quizId,
                                               @RequestBody question question) {
        try {
            question savedQuestion = questionService.addQuestionToQuiz(quizId, question);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Collections.singletonMap("error", e.getMessage()));
        }
    }


    @GetMapping("/{quizId}/question")
    public ResponseEntity<?> getQuestionsByQuiz(@PathVariable("quizId") Long quizId) {
        try {
            List<question> questions = questionService.getQuestionsByQuizId(quizId);
            return ResponseEntity.ok(questions);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<question> addGenericQuestion(@RequestBody question question) {
        question saved = questionService.addGenericQuestion(question);
        return ResponseEntity.ok(saved);
    }
}
