package com.idursun.springandangular;

import com.idursun.springandangular.domain.Account;
import com.idursun.springandangular.domain.UserProfile;
import com.idursun.springandangular.services.AccountRepository;
import com.idursun.springandangular.services.UserProfileRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AccountValidationTests extends IntegrationTestsBase {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserProfileRepository userProfileRepository;

    @Test
    public void testAccountValidationHandled() throws Exception {
        String json = "{\n" +
                "  \"name\" : \"user_t2\",\n" +
                "  \"password\": \"1\",\n" +
                "  \"email\" : \"user_turbo2@gmail.com\",\n" +
                "  \"active\" : true\n" +
                "}";


        mvc.perform(post("/rest/accounts").header("Authorization", "Bearer " + tokenForClient("user1")).contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isBadRequest());
    }

    @Test
    public void testUserProfileIsCreated() throws Exception {
        String json = "{\n" +
                "  \"name\" : \"user_t2\",\n" +
                "  \"password\": \"12345\",\n" +
                "  \"email\" : \"user_turbo2@gmail.com\",\n" +
                "  \"active\" : true\n" +
                "}";

        mvc.perform(post("/rest/accounts").header("Authorization", "Bearer " + tokenForClient("user1")).contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isCreated());

        Account account = accountRepository.findByName("user_t2");
        UserProfile userProfile = userProfileRepository.findByAccount(account);

        assertThat(userProfile, is(notNullValue()));
    }

}
