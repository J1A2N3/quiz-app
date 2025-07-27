package com.example.demo.controller;

import com.example.demo.model.quiz;
import com.example.demo.respository.questionrespository;
import com.example.demo.respository.quizrepository;
import com.example.demo.service.quizservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/quiz")
public class quizcontroller {

    @Autowired
    private quizservice quizService;

    @Autowired
    private quizrepository quizRepository;

    @Autowired
    private questionrespository questionRespository;

    
    // --- API ENDPOINTS ---
    @PostMapping("/create")
    @ResponseBody
    public quiz createQuiz(@RequestBody quiz quizObj) {
        return quizService.createQuiz(quizObj);
    }

    @GetMapping("/all")
    @ResponseBody
    public List<quiz> getAllQuiz() {
        return quizService.getAllQuiz();
    }


    @GetMapping("/test")
    @ResponseBody
    public String test() {
        return "Quiz App API is working!";
    }
}
