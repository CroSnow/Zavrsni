package hr.fer.projekt.komponente.servlets;

import hr.fer.projekt.komponente.dao.DAOProvider;
import hr.fer.projekt.komponente.model.Component;
import hr.fer.projekt.komponente.utility.Utility;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/edit")
public class EditServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {

        if (!Utility.checkLogin(req, resp)) {
            return;
        }

        String idString = req.getParameter("id");
        Long id = null;
        try {
            id = Long.parseLong(idString);
        } catch (NumberFormatException e) {
            id = null;
        }

        Component komponenta = null;
        if (id != null) {
            komponenta = DAOProvider.getDAO().getComponent(id);
        }

        req.setAttribute("komponenta", komponenta);
        req.getRequestDispatcher("/WEB-INF/pages/edit.jsp").forward(req, resp);
    }

}
