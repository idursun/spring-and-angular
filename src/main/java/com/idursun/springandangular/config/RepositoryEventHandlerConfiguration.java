package com.idursun.springandangular.config;

import com.idursun.springandangular.domain.events.AccountEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryEventHandlerConfiguration {

    @Bean
    AccountEventHandler accountEventHandler() {
        return new AccountEventHandler();
    }

}
