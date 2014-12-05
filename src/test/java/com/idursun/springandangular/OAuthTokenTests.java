package com.idursun.springandangular;

import com.idursun.springandangular.domain.Project;
import com.idursun.springandangular.services.ProjectRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class OAuthTokenTests extends IntegrationTestsBase {

    @Autowired
    ProjectRepository projectRepository;

    @Before
    public void Setup() {
        Project project = new Project();
        project.setId(1L);
        project.setName("Project1");
        project.setCreatedBy(null);

        projectRepository.save(project);
    }

    @Test
    public void testNotAuthorized() throws Exception {
        mvc.perform(get("/rest/projects/")).andExpect(status().isUnauthorized());
    }

    @Test
    public void testAuthorized() throws Exception {

        mvc.perform(get("/rest/projects/").header("Authorization", "Bearer " + tokenForClient("user1"))).andExpect(status().isOk());
    }
}
