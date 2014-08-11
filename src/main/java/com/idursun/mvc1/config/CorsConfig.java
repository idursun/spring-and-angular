package com.idursun.mvc1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@Order(-1)
public class CorsConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.requestMatchers().antMatchers(HttpMethod.OPTIONS, "/oauth/token", "/rest/**")
            .and()
                .csrf().disable()
            .authorizeRequests().anyRequest().permitAll()
            .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//                .antMatchers(HttpMethod.OPTIONS, "/oauth/**").permitAll()
//                .antMatchers(HttpMethod.OPTIONS, "/rest/**").permitAll()
//        .and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
