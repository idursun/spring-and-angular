package com.idursun.mvc1.models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Date createdOn;
    private Date modifiedOn;

    @ManyToOne(optional = true)
    private User createdBy;

    @OneToMany
    private List<Issue> issues;

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
    }
}
