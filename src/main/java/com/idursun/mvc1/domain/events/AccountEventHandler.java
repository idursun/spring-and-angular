package com.idursun.mvc1.domain.events;

import com.idursun.mvc1.domain.Account;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler(Account.class)
public class AccountEventHandler  {

    private static final Logger logger = LogManager.getLogger(AccountEventHandler.class);

    @HandleBeforeCreate
    public void handleBeforeCreate(Account account) {
        logger.info("account before create is called");
    }

}
