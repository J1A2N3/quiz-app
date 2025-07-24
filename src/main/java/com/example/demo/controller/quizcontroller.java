package com.example.demo.controller;

import com.example.demo.model.question;
import com.example.demo.model.quiz;
import com.example.demo.respository.questionrespository;
import com.example.demo.respository.quizrepository;
import com.example.demo.service.quizservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/{quizId}/questions")
    @ResponseBody
    public ResponseEntity<?> addQuestionToQuiz(@PathVariable("quizId") Long quizId, @RequestBody question question) {
        Optional<quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        question.setQuiz(quizOptional.get());
        question savedQuestion = questionRespository.save(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    @GetMapping("/{id}/questions")
    @ResponseBody
    public ResponseEntity<List<question>> getQuestionsByQuiz(@PathVariable("id") Long id) {
        Optional<quiz> quizOpt = quizRepository.findById(id);
        if (quizOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<question> questions = questionRespository.findByQuiz(quizOpt.get());
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/test")
    @ResponseBody
    public String test() {
        return "Quiz App API is working!";
    }
    

    @PostMapping("/questions")
    public question addQuestion(@RequestBody question question) {
        return questionRespository.save(question);
    }
}
