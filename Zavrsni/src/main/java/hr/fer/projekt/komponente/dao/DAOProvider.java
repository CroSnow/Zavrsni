package hr.fer.projekt.komponente.dao;

import hr.fer.projekt.komponente.dao.jpa.JPADAOImpl;

public class DAOProvider {

    private static DAO dao = new JPADAOImpl();

    public static DAO getDAO() {
        return dao;
    }

}