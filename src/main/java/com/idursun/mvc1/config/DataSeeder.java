package com.idursun.mvc1.config;

import com.idursun.mvc1.models.Issue;
import com.idursun.mvc1.models.Project;
import com.idursun.mvc1.models.User;
import com.idursun.mvc1.services.IssueRepository;
import com.idursun.mvc1.services.ProjectRepository;
import com.idursun.mvc1.services.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
//@Profile("development")
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private static Logger logger = Logger.getLogger(DataSeeder.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    IssueRepository issueRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        List<User> users = new ArrayList<>();
        List<Project> projects = new ArrayList<>();
        List<Issue> issues = new ArrayList<>();
        SecureRandom rnd = new SecureRandom(SecureRandom.getSeed(25));

        if (userRepository.count() == 0) {
            for (int i = 0; i < 25; i++) {
                User user = new User();
                user.setName("user" + i);
                user.setActive(true);
                user.setEmail("user" + i + "@gmail.com");
                user.setPassword("12345" + i);
                users.add(user);
            }
            userRepository.save(users);
        }

        final String[] words = {"Dixie", "Taylor", "Urban", "Mate", "Sugar", "Project", "Turb", "Ex", "Ray", "Super", "Awesome"};

        if (projectRepository.count() == 0) {
            for (int i = 0; i < 1000; i++) {
                Project project = new Project();
                project.setCreatedBy(users.get(i % users.size()));
                StringBuilder buffer = new StringBuilder();
                do {
                    buffer.append(words[rnd.nextInt(words.length)]);
                } while(rnd.nextDouble() < .4);
                project.setName(buffer.toString());
                project.setCreatedOn(Calendar.getInstance().getTime());

                for (int j = 1; j < 5; j++) {
                    Issue issue = new Issue();
                    issue.setCreatedBy(users.get(i % users.size()));
                    issue.setTitle("issue " + j + " for " + project.getName());
                    issue.setPriority(rnd.nextInt(4) + 1);
                    issue.setProject(project);
                    issues.add(issue);
                }
                projects.add(project);

            }

            projectRepository.save(projects);
            issueRepository.save(issues);
        }
    }
}
