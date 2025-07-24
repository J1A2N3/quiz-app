package com.example.demo.respository;

import com.example.demo.model.quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface quizrepository extends JpaRepository<quiz, Long> {
	
}

