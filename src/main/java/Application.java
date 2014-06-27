import com.idursun.mvc1.config.MyRestConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@EntityScan("com.idursun.mvc1.models")
@EnableJpaRepositories("com.idursun.mvc1.services")
@Import(MyRestConfig.class)
public class Application extends SpringBootServletInitializer {



    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
