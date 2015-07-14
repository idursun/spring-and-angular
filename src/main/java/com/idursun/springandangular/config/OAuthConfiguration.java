package com.idursun.springandangular.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class OAuthConfiguration {
    private static final String RESOURCE_ID = "spring1";

    @Configuration
    @EnableAuthorizationServer
    public static class MyAuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

        @Autowired
        @Qualifier("myAuthenticationManager")
        private AuthenticationManager authenticationManager;

        @Bean
        public JwtAccessTokenConverter accessTokenConverter() {
            return new JwtAccessTokenConverter();
        }

        @Override
        public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
            clients.inMemory().withClient("web")
                    .authorities("ROLE_USER", "ROLE_CLIENT")
                    .authorizedGrantTypes("password")
                    .resourceIds(RESOURCE_ID)
                    .secret("secret")
                    .scopes("read", "write");
        }

        @Override
        public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
            endpoints.authenticationManager(authenticationManager)
                    .accessTokenConverter(accessTokenConverter());
        }

    }

    @Configuration
    @EnableResourceServer
    public static class MyResourceServerConfig extends ResourceServerConfigurerAdapter {

        @Autowired
        private ClientDetailsService clientDetailsService;

        @Bean
        public JwtAccessTokenConverter accessTokenConverter() {
            return new JwtAccessTokenConverter();
        }

        @Bean
        public TokenStore tokenStore() {
            return new JwtTokenStore(accessTokenConverter());
        }

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) throws Exception {

            final DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
            defaultTokenServices.setTokenStore(tokenStore());
            defaultTokenServices.setTokenEnhancer(accessTokenConverter());
            defaultTokenServices.setClientDetailsService(clientDetailsService);
            resources.resourceId(RESOURCE_ID).tokenServices(defaultTokenServices);
        }

        @Override
        public void configure(HttpSecurity http) throws Exception {

            http.authorizeRequests().antMatchers("/rest/**").permitAll()
                    .and()
                    .csrf().disable()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        }
    }
}