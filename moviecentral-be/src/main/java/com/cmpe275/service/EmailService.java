/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 *
 * @author Shreya Shah
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;

    @Async
    public void generateVerificationTemplate(String userName, String to, String subject, String text) throws Exception {
        String emailTemplate = "<!DOCTYPE html>\n"
                + "<html>\n"
                + "<body>\n"
                + "<h1>Welcome to Movie Central!</h1>\n"
                + "<p>Hi " + userName + ",<BR/><BR/>\n"
                + "Click this link to confirm your email address and complete setup for your candidate account.<BR/><BR/>\n"
                + "\n"
                + "https://cmpe275.ddns.net/verify/" + text + "\n"
                + "<BR/><BR/>\n"
                + "we request you not to reply to this mail.\n"
                + "<BR/><BR/>\n"
                + "</p>\n"
                + "\n"
                + "<p>\n"
                + "Thanks,<BR/>\n"
                + "Movie Central Team!\n"
                + "</p>\n"
                + "\n"
                + "</body>\n"
                + "</html>";
        this.sendEmail(userName, to, subject, emailTemplate);
    }

    @Async
    public void generateConfirmationTemplate(String userName, String to, String subject, String text) throws Exception {
        String emailTemplate = "<!DOCTYPE html>\n"
                + "<html>\n"
                + "<body>\n"
                + "<h1>Welcome to Movie Central!</h1>\n"
                + "<p>Hi " + userName + ",<BR/><BR/>\n"
                + "Enjoy all the latest Movies with High Definition Quality.<BR/><BR/>\n"
                + "\n"
                + "<BR/><BR/>\n"
                + "we request you not to reply to this mail.\n"
                + "<BR/><BR/>\n"
                + "</p>\n"
                + "\n"
                + "<p>\n"
                + "Thanks,<BR/>\n"
                + "Movie Central Team!\n"
                + "</p>\n"
                + "\n"
                + "</body>\n"
                + "</html>";
        this.sendEmail(userName, to, subject, emailTemplate);
    }

    @Async
    public void sendEmail(String userName, String to, String subject, String emailTemplate) throws Exception {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(to);
        helper.setText(emailTemplate, true);
        helper.setSubject(subject);
        sender.send(message);
    }

}
