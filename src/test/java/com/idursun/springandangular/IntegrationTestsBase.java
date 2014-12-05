package com.idursun.springandangular;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public abstract class IntegrationTestsBase {

    @Autowired
    FilterChainProxy springSecurityFilter;

    @Autowired
    protected WebApplicationContext context;

    @Autowired
    DefaultTokenServices defaultTokenServices;

    protected MockMvc mvc;

    @Before
    public void setUp() {
        this.mvc = webAppContextSetup(this.context).addFilters(springSecurityFilter).build();
    }

    protected String tokenForClient(String username) {
        return getToken(username, "ROLE_CLIENT");
    }

    protected String getToken(String username, String... authorities) {
        Set<String> scopes = new HashSet<>();
        scopes.add("read");
        scopes.add("write");

        Set<String> resourceIds = new HashSet<>();
        resourceIds.add("spring1");

        OAuth2Request auth2Request = new OAuth2Request(null, "web", null, true, scopes, resourceIds, "", null, null);
        OAuth2AccessToken accessToken = defaultTokenServices.createAccessToken(new OAuth2Authentication(auth2Request, new TestingAuthenticationToken(username, null, authorities)));
        return accessToken.getValue();
    }
}
