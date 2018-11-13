/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.controller;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;

/**
 *
 * @author Shreya Shah
 */
@Controller
public class EmailController {

    @Autowired
    private JavaMailSender sender;

    private String emailTemplate = "<!DOCTYPE html>\n"
            + "<html>\n"
            + "<body>\n"
            + "<h1>Verification your Account of Movie Central</h1>\n"
            + "<p>Hi {{user}},<BR/>\n"
            + "Click this link to confirm your email address and complete setup for your candidate account.\n"
            + "\n"
            + "http://localhost:3000/verify/.\n"
            + "<BR/><BR/>\n"
            + ", we request you not to reply to this mail.\n"
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

    public void sendEmail(String userName, String to, String subject, String text) throws Exception {
        String emailTemplate = "<!DOCTYPE html>\n"
                + "<html>\n"
                + "<body>\n"
                + "<h1>Welcome to Movie Central!</h1>\n"
                + "<p>Hi " + userName + ",<BR/><BR/>\n"
                + "Click this link to confirm your email address and complete setup for your candidate account.<BR/><BR/>\n"
                + "\n"
                + "http://localhost:3000/verify/" + text + ".\n"
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
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setTo(to);
        helper.setText(emailTemplate, true);
        helper.setSubject(subject);
        sender.send(message);
    }

}
