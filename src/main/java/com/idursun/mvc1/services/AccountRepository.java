package com.idursun.mvc1.services;

import com.idursun.mvc1.domain.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByName(String name);
}
