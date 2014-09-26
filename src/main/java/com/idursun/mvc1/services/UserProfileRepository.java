package com.idursun.mvc1.services;

import com.idursun.mvc1.domain.Account;
import com.idursun.mvc1.domain.UserProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository()
@RepositoryRestResource(exported = false)
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

    UserProfile findByAccount(Account account);

}
