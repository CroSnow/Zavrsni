package hr.fer.projekt.komponente.dao;

import hr.fer.projekt.komponente.model.AppUser;
import hr.fer.projekt.komponente.model.Component;

import java.util.List;

public interface DAO {

    void addComponent(Component component);

    Component getComponent(Long id);

    List<Component> getAllComponents();

    AppUser getUser(String username, String passwordHash);

    boolean postojiKorisnik(String username);

    boolean postojiEmail(String email);

    void addApplicationUser(AppUser au);

    List<Component> getAllPublicComponents();

    List<Component> getComponentsOfUser(AppUser currentUser);

    void mergeComponent(Component component);
}