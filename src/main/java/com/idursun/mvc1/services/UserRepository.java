package com.idursun.mvc1.services;

import com.idursun.mvc1.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByName(String name);
}
