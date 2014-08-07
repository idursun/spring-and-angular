import com.idursun.mvc1.Application;
import com.idursun.mvc1.models.Project;
import com.idursun.mvc1.services.ProjectRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class OAuthTokenTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    FilterChainProxy springSecurityFilter;

    @Before
    public void setUp() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.context).addFilters(this.springSecurityFilter).build();

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
}
