import com.idursun.mvc1.Application;
import com.idursun.mvc1.services.AccountRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class AccountValidationTests {

    @Autowired
    AccountRepository accountRepository;
    private MockMvc mvc;
    @Autowired
    private WebApplicationContext context;

    @Before
    public void Setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.context).build();
    }

    @Test
    public void testAccountValidationHandled() throws Exception {
        String json = "{\n" +
                "  \"name\" : \"user_t2\",\n" +
                "  \"password\": \"1\",\n" +
                "  \"email\" : \"user_turbo2@gmail.com\",\n" +
                "  \"active\" : true\n" +
                "}";

        mvc.perform(post("/rest/accounts").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isBadRequest());
    }

}
