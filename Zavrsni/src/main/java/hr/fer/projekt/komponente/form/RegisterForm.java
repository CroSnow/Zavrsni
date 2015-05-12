package hr.fer.projekt.komponente.form;

import hr.fer.projekt.komponente.dao.DAO;
import hr.fer.projekt.komponente.dao.DAOProvider;
import hr.fer.projekt.komponente.model.AppUser;
import hr.fer.projekt.komponente.utility.Utility;

import javax.servlet.http.HttpServletRequest;

public class RegisterForm extends AbstractForm {

    private String username;
    private String email;
    private String password;
    private String password2;

    public RegisterForm(HttpServletRequest req) {
        DAO dao = DAOProvider.getDAO();

        username = req.getParameter("username").trim();
        if (username.isEmpty()) {
            dodajGresku("username", "Korisničko ime ne smije biti prazno.");
        } else if (dao.postojiKorisnik(username)) {
            dodajGresku("username", "Korisničko ime je već zauzeto.");
        }

        email = req.getParameter("email");
        if (email.isEmpty()) {
            dodajGresku("email", "E-mail adresa ne smije biti prazna.");
        } else if (dao.postojiEmail(email)) {
            dodajGresku("email", "E-mail adresa je već zauzeta.");
        }

        password = req.getParameter("password");
        if (!Utility.isPasswordSafe(password)) {
            dodajGresku("password", "Lozinka mora sadržavati minimalno 8 znakova.");
        }

        password2 = req.getParameter("password2");
        if (!password.equals(password2)) {
            dodajGresku("password2", "Unosi se ne podudaraju.");
        }
    }

    public AppUser napuniApplicationUser(AppUser au) {
        au.setUsername(username);
        au.setEmail(email);
        String passwordHash = Utility.createPasswordHash(password);
        au.setPasswordHash(passwordHash);

        return au;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

}
