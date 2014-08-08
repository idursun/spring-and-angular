package com.idursun.mvc1.config;

import com.idursun.mvc1.models.Project;
import com.idursun.mvc1.models.User;
import com.idursun.mvc1.services.ProjectRepository;
import com.idursun.mvc1.services.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
//@Profile("development")
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private static Logger logger = Logger.getLogger(MyRestConfig.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        List<User> users = new ArrayList<>();
        List<Project> projects = new ArrayList<>();
        if (userRepository.count() == 0) {
            for (int i = 0; i < 5; i++) {
                User user = new User();
                user.setName("user" + i);
                user.setActive(true);
                user.setEmail("user" + i + "@gmail.com");
                user.setPassword("12345" + i);
                users.add(user);
            }
            userRepository.save(users);
        }

        if (projectRepository.count() == 0) {
            for (int i = 0; i < 10; i++) {
                Project project = new Project();
                project.setCreatedBy(users.get(i % users.size()));
                project.setName("project" + i);
                project.setCreatedOn(Calendar.getInstance().getTime());
                projects.add(project);
            }
            projectRepository.save(projects);
        }
    }
}
