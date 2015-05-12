package hr.fer.projekt.komponente.database;

import hr.fer.projekt.komponente.model.Component;

import java.util.ArrayList;
import java.util.List;

public class Database {

    private static Long latestID = 0L;
    private static List<Component> components = new ArrayList<>();

    public static List<Component> getAllComponents() {
        return components;
    }

    public static boolean addComponent(Component component) {
        if (component.getId() == null) {
            component.setId(latestID);
            latestID++;
        }
        return components.add(component);
    }

    public static boolean removeComponent(Component component) {
        return components.remove(component);
    }

}
