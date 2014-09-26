package com.idursun.mvc1.domain.events;

import com.idursun.mvc1.domain.Account;
import com.idursun.mvc1.domain.UserProfile;
import com.idursun.mvc1.services.UserProfileRepository;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@RepositoryEventHandler(Account.class)
public class AccountEventHandler  {

    private static final Logger logger = LogManager.getLogger(AccountEventHandler.class);

    @Autowired
    UserProfileRepository userProfileRepository;

    @HandleAfterCreate
    public void handleAfterCreate(Account account) {

        UserProfile userProfile = userProfileRepository.findByAccount(account);
        if (userProfile == null)
        {
            userProfile = new UserProfile(account);
            userProfile.setDisplayName(account.getName());
            userProfile.setReputation(0);

            userProfileRepository.save(userProfile);
        }

    }

}
