package com.idursun.mvc1.config;

import com.idursun.mvc1.models.Issue;
import com.idursun.mvc1.models.Project;
import com.idursun.mvc1.models.User;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class MyRestConfig extends RepositoryRestMvcConfiguration {
    private static Logger logger = Logger.getLogger(MyRestConfig.class);

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        try {
            config.setBaseUri(new URI("/rest"));
            config.exposeIdsFor(Issue.class, Project.class, User.class);
        } catch (URISyntaxException e) {
            logger.error("failed to set base uri", e);
        }
    }

    @Override
    @Bean
    public HateoasPageableHandlerMethodArgumentResolver pageableResolver() {
        HateoasPageableHandlerMethodArgumentResolver resolver = super.pageableResolver();
        resolver.setOneIndexedParameters(true);
        return resolver;
    }
}
