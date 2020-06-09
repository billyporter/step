package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for logging in. */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
    
        UserService userService = UserServiceFactory.getUserService();
        if (userService.isUserLoggedIn()) {
          String userEmail = userService.getCurrentUser().getEmail();
          String urlToRedirectToAfterUserLogsOut = "/";
          String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
          response.getWriter().println("Y");
          response.getWriter().println("<h2>Hello " + userEmail + "!</h2>");
          response.getWriter().println("<p>Logout <a href=\"" + logoutUrl + "\">here</a>.</p>");
        } else {
          String urlToRedirectToAfterUserLogsIn = "/";
          String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
          response.getWriter().println("N");
          response.getWriter().println("<h2>Hello. Please Login to Comment.</h2>");
          response.getWriter().println("<p>Login <a href=\"" + loginUrl + "\">here</a>.</p>");
        }
      }
}