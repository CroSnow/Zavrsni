package hr.fer.projekt.komponente.web;

import hr.fer.projekt.komponente.dao.jpa.JPAEMFProvider;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class Init implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent sce) {

		EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("komponente.baza.podataka");
		sce.getServletContext().setAttribute("my.application.emf", emf);
		JPAEMFProvider.setEmf(emf);

//		/* Insert test user. */
//		AppUser testUser = new AppUser();
//		testUser.setEmail("test@fer.hr");
//		testUser.setUsername("test");
//		testUser.setPasswordHash(Utility.createPasswordHash("test"));
//		JPAEMProvider.getEntityManager().persist(testUser);
//		JPAEMProvider.close();
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		JPAEMFProvider.setEmf(null);
		EntityManagerFactory emf = (EntityManagerFactory) sce
				.getServletContext().getAttribute("my.application.emf");
		if (emf != null) {
			emf.close();
		}
	}
}