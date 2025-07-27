package com.example.demo.service;

import com.example.demo.model.question;
import com.example.demo.model.quiz;
import com.example.demo.respository.quizrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class quizservice {

    @Autowired
    private quizrepository quizRepo;

    public List<question> getQuestionsForQuiz(Long quizId) {
        return quizRepo.findById(quizId)
                       .map(q -> q.getQuestions())
                       .orElse(Collections.emptyList());
    }

    public quiz createQuiz(quiz quiz) {
        quiz.getQuestions().forEach(q -> q.setQuiz(quiz)); 
        return quizRepo.save(quiz);
    }
    
    public List<quiz> getAllQuiz() {
        return quizRepo.findAll(); 
    }

}
