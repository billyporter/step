package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.Login;
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
        UserService userService = UserServiceFactory.getUserService();
        String userEmail = "";
        String urlToRedirectToAfterUserLogsOut = "/";
        String logoutUrl = "";
        String loginUrl = "";
        int loginStatus = 0;

        if (userService.isUserLoggedIn()) {
          userEmail = userService.getCurrentUser().getEmail();
          urlToRedirectToAfterUserLogsOut = "/";
          logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
          loginStatus = 1;
        } else {
          String urlToRedirectToAfterUserLogsIn = "/";
          loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
        }

        Login userLogin = new Login(userEmail, urlToRedirectToAfterUserLogsOut, loginUrl, logoutUrl, loginStatus);
        Gson gson = new Gson();
        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(userLogin));
    }
}