import org.hsqldb.jdbc.JDBCDataSource;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.sql.DataSource;

@Configuration
@EnableAutoConfiguration
@EnableJpaRepositories
public class SampleDataJpaApplication {

    @Bean
    DataSource dataSource() {
        DataSource dataSource = new JDBCDataSource();
        return dataSource;
    }
}
