package com.idursun.mvc1.config;

import com.idursun.mvc1.domain.events.AccountEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryEventHandlerConfiguration {

    @Bean
    AccountEventHandler accountEventHandler() {
        return new AccountEventHandler();
    }

}
