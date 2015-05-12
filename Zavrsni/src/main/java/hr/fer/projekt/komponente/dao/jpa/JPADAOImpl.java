package hr.fer.projekt.komponente.dao.jpa;

import hr.fer.projekt.komponente.dao.DAO;
import hr.fer.projekt.komponente.model.AppUser;
import hr.fer.projekt.komponente.model.Component;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;

public class JPADAOImpl implements DAO {

    @Override
    public void addComponent(Component component) {

        EntityManager em = JPAEMProvider.getEntityManager();

        em.persist(component);
        em.close();
    }

    @Override
    public void mergeComponent(Component component) {

        EntityManager em = JPAEMProvider.getEntityManager();

        em.merge(component);
        em.close();
    }

    @Override
    public Component getComponent(Long id) {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT c FROM Component AS c WHERE c.id = ?");
        q.setParameter(1, id);

        Component component;
        try {
            component = (Component) q.getSingleResult();
        } catch (NoResultException e) {
            component = null;
        }
        
        em.close();

        return component;
    }

    @Override
    public List<Component> getAllComponents() {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT c FROM Component AS c");

        @SuppressWarnings("unchecked")
        List<Component> components = (List<Component>) q.getResultList();
        
        em.close();

        return components;
    }

    @Override
    public AppUser getUser(String username, String passwordHash) {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em
                .createQuery("SELECT u FROM AppUser AS u WHERE u.username = ? AND u.passwordHash = ?");
        q.setParameter(1, username);
        q.setParameter(2, passwordHash);

        AppUser user;
        try {
            user = (AppUser) q.getSingleResult();
        } catch (NoResultException e) {
            user = null;
        }
        
        em.close();

        return user;
    }

    @Override
    public boolean postojiKorisnik(String username) {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT u FROM AppUser AS u WHERE u.username = ?");
        q.setParameter(1, username);

        AppUser user;
        try {
            user = (AppUser) q.getSingleResult();
        } catch (NoResultException e) {
            user = null;
        }
        
        em.close();

        return user != null;
    }

    @Override
    public boolean postojiEmail(String email) {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT u FROM AppUser AS u WHERE u.email = ?");
        q.setParameter(1, email);

        AppUser user;
        try {
            user = (AppUser) q.getSingleResult();
        } catch (NoResultException e) {
            user = null;
        }
        
        em.close();

        return user != null;
    }

    @Override
    public void addApplicationUser(AppUser au) {

        EntityManager em = JPAEMProvider.getEntityManager();

        em.persist(au);
        em.close();
    }

    @Override
    public List<Component> getAllPublicComponents() {

        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em
                .createQuery("SELECT c FROM Component AS c WHERE c.isPrivate = false ORDER BY c.name");

        @SuppressWarnings("unchecked")
        List<Component> components = (List<Component>) q.getResultList();
        
        em.close();

        return components;
    }

    @Override
    public List<Component> getComponentsOfUser(AppUser user) {
        EntityManagerFactory emf = JPAEMFProvider.getEmf();
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("SELECT c FROM Component AS c "
                + "WHERE c.isPrivate = true AND c.author = :author " + "ORDER BY c.name");
        q.setParameter("author", user);

        @SuppressWarnings("unchecked")
        List<Component> components = (List<Component>) q.getResultList();
        
        em.close();

        return components;
    }

}