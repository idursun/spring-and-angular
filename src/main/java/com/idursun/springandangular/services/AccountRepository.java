package com.idursun.springandangular.services;

import com.idursun.springandangular.domain.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByName(String name);
}
