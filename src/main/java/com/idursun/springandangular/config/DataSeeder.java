package com.idursun.springandangular.config;

import com.idursun.springandangular.domain.Account;
import com.idursun.springandangular.domain.Issue;
import com.idursun.springandangular.domain.Project;
import com.idursun.springandangular.domain.UserProfile;
import com.idursun.springandangular.services.AccountRepository;
import com.idursun.springandangular.services.IssueRepository;
import com.idursun.springandangular.services.ProjectRepository;
import com.idursun.springandangular.services.UserProfileRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
//@Profile("development")
public class DataSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private static Logger logger = Logger.getLogger(DataSeeder.class);

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    IssueRepository issueRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

        List<Account> accounts = new ArrayList<>();
        List<UserProfile> userProfiles = new ArrayList<>();
        List<Project> projects = new ArrayList<>();
        List<Issue> issues = new ArrayList<>();
        SecureRandom rnd = new SecureRandom(SecureRandom.getSeed(25));

        if (accountRepository.count() == 0) {
            for (int i = 0; i < 25; i++) {
                Account account = new Account();
                account.setName("user" + i);
                account.setActive(true);
                account.setEmail("user" + i + "@gmail.com");
                account.setPassword("12345" + i);
                accounts.add(account);

                UserProfile profile = new UserProfile(account);
                profile.setDisplayName("User " + i);
                profile.setReputation(rnd.nextInt(2000));
                userProfiles.add(profile);
            }
            accountRepository.save(accounts);
            userProfileRepository.save(userProfiles);
        }

        final String[] words = {"Dixie", "Taylor", "Urban", "Mate", "Sugar", "Project", "Turb", "Ex", "Ray", "Super", "Awesome"};

        if (projectRepository.count() == 0) {
            for (int i = 0; i < 1000; i++) {
                Project project = new Project();
                project.setCreatedBy(userProfiles.get(i % accounts.size()));
                StringBuilder buffer = new StringBuilder();
                do {
                    buffer.append(words[rnd.nextInt(words.length)]);
                } while(rnd.nextDouble() < .4);
                project.setName(buffer.toString());
                project.setCreatedOn(Calendar.getInstance().getTime());

                for (int j = 1; j < 5; j++) {
                    Issue issue = new Issue();
                    issue.setCreatedBy(userProfiles.get(i % accounts.size()));
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
