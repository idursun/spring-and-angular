package com.idursun.mvc1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
public class SecuritySettings {

    private static final String RESOURCE_ID = "spring1";

    @Configuration
    @EnableAuthorizationServer
    public static class MyAuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
        @Override
        public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
            oauthServer.realm("spring1");
        }

        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
            super.configure(clients);
            clients.inMemory().withClient("web")
                    .authorities("read", "write")
                    .authorizedGrantTypes("password")
                    .resourceIds(RESOURCE_ID)
                    .accessTokenValiditySeconds(9000)
                    .scopes("USER");
        }

        @Bean
        public TokenStore tokenStore() {
            InMemoryTokenStore tokenStore = new InMemoryTokenStore();
            return tokenStore;
        }

        @Override
        public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints.tokenStore(tokenStore());
        }
    }

    @Configuration
    @EnableResourceServer
    public static class MyResourceServerConfiguration extends ResourceServerConfigurerAdapter {
        @Override
        public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
            resources.resourceId(RESOURCE_ID).authenticationManager(authenticationManager());
        }

        @Bean
        public AuthenticationManager authenticationManager() {
            OAuth2AuthenticationManager authenticationManager = new OAuth2AuthenticationManager();
            authenticationManager.setResourceId(RESOURCE_ID);
            authenticationManager.setTokenServices(new DefaultTokenServices());
            return authenticationManager;
        }

    }

    @Configuration
    public static class MyWebSecurity extends WebSecurityConfigurerAdapter {

    }


}
