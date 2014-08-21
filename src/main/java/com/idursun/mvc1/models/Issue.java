package com.idursun.mvc1.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    int priority;

    @NotNull
    String title;
    
    String description;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private Project project;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}
