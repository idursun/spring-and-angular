package com.idursun.springandangular.services;

import com.idursun.springandangular.domain.Account;
import com.idursun.springandangular.domain.UserProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository()
@RepositoryRestResource(exported = false)
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

    UserProfile findByAccount(Account account);

}
