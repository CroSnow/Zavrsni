package hr.fer.projekt.komponente.servlets;

import hr.fer.projekt.komponente.dao.DAOProvider;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ComponentServlet
 */
@WebServlet(asyncSupported = true, urlPatterns = { "/component" })
public class ComponentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    long id = Long.parseLong(request.getParameter("id"));
	    String data = DAOProvider.getDAO().getComponent(id).getData();
		PrintWriter writer = new PrintWriter(response.getOutputStream());
		writer.print(data);
		writer.flush();
		writer.close();
	}

}
