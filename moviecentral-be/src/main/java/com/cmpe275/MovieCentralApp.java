package com.cmpe275;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MovieCentralApp {

	public static void main(String[] args) {
		SpringApplication.run(MovieCentralApp.class, args);
	}
}
