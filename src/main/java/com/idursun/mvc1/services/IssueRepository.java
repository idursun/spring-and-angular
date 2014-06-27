package com.idursun.mvc1.services;

import com.idursun.mvc1.models.Issue;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "issues", path = "issues")
interface IssueRepository extends PagingAndSortingRepository<Issue, Long >{

}
