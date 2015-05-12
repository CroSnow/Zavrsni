package hr.fer.projekt.komponente.servlets;

import hr.fer.projekt.komponente.dao.DAOProvider;
import hr.fer.projekt.komponente.model.AppUser;
import hr.fer.projekt.komponente.model.Component;
import hr.fer.projekt.komponente.utility.Utility;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/menu")
public class MenuServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        if (req.getParameter("prijava") != null) {
            login(req);
        } else if (req.getParameter("odjava") != null) {
            req.getSession().removeAttribute("korisnik");
        } else if (req.getParameter("registracija") != null) {
            ;
        } else {
            if (!Utility.checkLogin(req, resp)) {
                return;
            }
            saveComponent(req, resp);
        }

        resp.sendRedirect(req.getContextPath() + "/menu");
    }

    private void login(HttpServletRequest req) {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String passwordHash = Utility.createPasswordHash(password);

        AppUser user = DAOProvider.getDAO().getUser(username, passwordHash);

        if (user == null) {
            req.getSession().setAttribute("poruka", "Neispravno korisničko ime ili lozinka.");
        } else {
            req.getSession().setAttribute("korisnik", user);
        }
    }

    private void saveComponent(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Component component = createComponent(req);
        if (component.getId() == null) {
            DAOProvider.getDAO().addComponent(component);
        } else {
            DAOProvider.getDAO().mergeComponent(component);
        }

        req.getSession().setAttribute("poruka", "Komponenta je uspješno spremljena u bazu.");
    }

    private Component createComponent(HttpServletRequest req) {

        Long id;
        try {
            id = Long.parseLong(req.getParameter("id"));
        } catch (NumberFormatException e) {
            id = null;
        }

        Component component;
        if (id == null) {
            component = new Component();
        } else {
            component = DAOProvider.getDAO().getComponent(id);
        }

        String name = req.getParameter("name");
        String data = req.getParameter("data");
        String image = req.getParameter("image");
        String inPinsString = req.getParameter("inPins");
        String outPinsString = req.getParameter("outPins");
        Integer inPins = Integer.parseInt(inPinsString);
        Integer outPins = Integer.parseInt(outPinsString);
        Boolean isPrivate = Boolean.parseBoolean(req.getParameter("isPrivate"));
        AppUser author = (AppUser) req.getSession().getAttribute("korisnik");

        component.setName(name);
        component.setData(data);
        component.setImage(image);
        component.setInPins(inPins);
        component.setOutPins(outPins);
        component.setIsPrivate(isPrivate);
        component.setAuthor(author);

        return component;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
            IOException {

        List<Component> components = DAOProvider.getDAO().getAllPublicComponents();

        AppUser currentUser = (AppUser) req.getSession().getAttribute("korisnik");
        if (currentUser != null) {
            components.addAll(DAOProvider.getDAO().getComponentsOfUser(currentUser));
        }
        req.setAttribute("komponente", components);
        req.getRequestDispatcher("/WEB-INF/pages/menu.jsp").forward(req, resp);
    }

}
