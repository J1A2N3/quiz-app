package com.example.demo.service;

import com.example.demo.model.question;
import com.example.demo.model.quiz;
import com.example.demo.respository.questionrespository;
import com.example.demo.respository.quizrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class questionservice {

    @Autowired
    private questionrespository questionRepo;

    @Autowired
    private quizrepository quizRepo;

    public question addQuestionToQuiz(Long quizId, question question) {
        Optional<quiz> quizOpt = quizRepo.findById(quizId);
        if (quizOpt.isEmpty()) {
            throw new RuntimeException("Quiz not found with ID: " + quizId);
        }
        question.setQuiz(quizOpt.get());
        return questionRepo.save(question);
    }

    public List<question> getQuestionsByQuizId(Long quizId) {
        Optional<quiz> quizOpt = quizRepo.findById(quizId);
        if (quizOpt.isEmpty()) {
            throw new RuntimeException("Quiz not found with ID: " + quizId);
        }
        return questionRepo.findByQuiz(quizOpt.get());
    }

    public question addGenericQuestion(question question) {
        return questionRepo.save(question);
    }
}
