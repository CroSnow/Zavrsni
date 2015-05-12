package hr.fer.projekt.komponente.servlets;

import hr.fer.projekt.komponente.dao.DAOProvider;
import hr.fer.projekt.komponente.model.AppUser;
import hr.fer.projekt.komponente.model.Component;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditSystemServlet
 */
@WebServlet(asyncSupported = true, urlPatterns = { "/edit_system" })
public final class EditSystemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        List<Component> components = DAOProvider.getDAO().getAllPublicComponents();

        AppUser currentUser = (AppUser) request.getSession().getAttribute("korisnik");
        if (currentUser != null) {
            components.addAll(DAOProvider.getDAO().getComponentsOfUser(currentUser));
        }

        request.setAttribute("komponente", components);
        request.getRequestDispatcher("/WEB-INF/pages/edit_system.jsp").forward(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

    }

}
