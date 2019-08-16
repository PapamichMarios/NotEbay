package com.dit.ebay;

/*
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import com.dit.ebay.service.UserService;
import com.dit.ebay.service.PopulateDB;

@SpringBootApplication
public class EbayApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbayApplication.class, args);
	}

	// Create admin on the fly
	@Component
	public class CommandLineAppStartupRunner implements CommandLineRunner {
		@Autowired
		UserService userService;

		@Autowired
		PopulateDB populateDB;

		@Override
		public void run(String... args) throws Exception {
			// Creates Admin on the fly
			userService.createAdmin();

			populateDB.populateUsers();
			populateDB.populateItems();
		}
	}

	// In case we want to redirect http to https
	/*
	@Bean
	public ServletWebServerFactory servletContainer() {
		TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
			@Override
			protected void postProcessContext(Context context) {
				SecurityConstraint securityConstraint = new SecurityConstraint();
				securityConstraint.setUserConstraint("CONFIDENTIAL");
				SecurityCollection collection = new SecurityCollection();
				collection.addPattern("/*");
				securityConstraint.addCollection(collection);
				context.addConstraint(securityConstraint);
			}
		};
		tomcat.addAdditionalTomcatConnectors(redirectConnector());
		return tomcat;
	}

	private Connector redirectConnector() {
		Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
		connector.setScheme("http");
		connector.setPort(8080);
		connector.setSecure(true);
		connector.setRedirectPort(8443);
		return connector;
	}
	*/
}
