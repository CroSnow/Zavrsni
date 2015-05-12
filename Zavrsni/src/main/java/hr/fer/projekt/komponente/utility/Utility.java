package hr.fer.projekt.komponente.utility;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class Utility {

    private Utility() {

    }

    public static String createPasswordHash(String password) {
        return Integer.toHexString(password.hashCode());
    }

    public static boolean isPasswordSafe(String password) {
        return password.length() >= 8;
    }

    public static boolean checkLogin(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        if (req.getSession().getAttribute("korisnik") == null) {
            req.getSession().setAttribute("poruka", "Niste prijavljeni. Molimo prijavite se.");
            resp.sendRedirect(req.getContextPath() + "/menu");
            return false;
        }
        return true;
    }

}
