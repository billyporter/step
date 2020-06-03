package com.google.sps.servlets;

import com.google.sps.data.CommentSection;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/comment-page")
public class CommentServlet extends HttpServlet {

  private CommentSection comment= new CommentSection();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    String json = new Gson().toJson(comment);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get input from form
    String[] userComment = getUserComment(request);
    comment.postComment(userComment[0], userComment[1]);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");

  }

  private String[] getUserComment(HttpServletRequest request) {
    // Get the input from the form
    String[] userComment = new String[2];
    userComment[0] = request.getParameter("user-comment");
    userComment[1] = request.getParameter("user-comment");
    
    // TODO: Validate Input

    return userComment;
  }

}
