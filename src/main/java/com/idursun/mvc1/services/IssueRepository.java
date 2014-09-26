package com.idursun.mvc1.services;

import com.idursun.mvc1.domain.Issue;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "issues", path = "issues")
public interface IssueRepository extends PagingAndSortingRepository<Issue, Long> {

}
