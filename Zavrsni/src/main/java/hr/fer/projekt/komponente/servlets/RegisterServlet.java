package hr.fer.projekt.komponente.servlets;

import hr.fer.projekt.komponente.dao.DAOProvider;
import hr.fer.projekt.komponente.form.RegisterForm;
import hr.fer.projekt.komponente.model.AppUser;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    public static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        RegisterForm form = new RegisterForm(req);
        if (form.imaGresaka()) {
            req.setAttribute("forma", form);
            req.getRequestDispatcher("/WEB-INF/pages/register.jsp").forward(req, resp);
            return;
        }

        AppUser au = form.napuniApplicationUser(new AppUser());

        DAOProvider.getDAO().addApplicationUser(au);

        req.getSession().setAttribute("poruka", "Registracija je uspješno obavljena.");
        resp.sendRedirect(req.getContextPath() + "/menu");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {
        req.getRequestDispatcher("/WEB-INF/pages/register.jsp").forward(req, resp);
    }

}
