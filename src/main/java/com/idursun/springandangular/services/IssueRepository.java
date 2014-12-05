package com.idursun.springandangular.services;

import com.idursun.springandangular.domain.Issue;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "issues", path = "issues")
public interface IssueRepository extends PagingAndSortingRepository<Issue, Long> {

}
