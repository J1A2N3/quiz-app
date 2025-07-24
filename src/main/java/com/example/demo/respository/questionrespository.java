package com.example.demo.respository;
import com.example.demo.model.question;
import com.example.demo.model.quiz;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface questionrespository extends JpaRepository<question, Long> {
	 List<question> findByQuiz(quiz quiz);
	List<question> findByTopic(String topic);

}
