package com.google.sps.servlets;


import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.data.Award;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for loading award. */
@WebServlet("/load-awards")
public class AwardsServlet extends HttpServlet {

  public void init(ServletConfig config) {

      Entity awardEntity = new Entity("award", "first");
      awardEntity.setProperty("year", 2018);
      awardEntity.setProperty("image", "../../assets/images/VR.JPG");
      awardEntity.setProperty("description", "Hesburgh-Yusko Scholarship");

      Entity awardEntity2 = new Entity("award", "second");
      awardEntity2.setProperty("year", 2018);
      awardEntity2.setProperty("image", "../../assets/images/MAD.jpg");
      awardEntity2.setProperty("description", "MAD-Score Creator and Publication");

      Entity awardEntity3 = new Entity("award", "third");
      awardEntity3.setProperty("year", 2019);
      awardEntity3.setProperty("image", "../../assets/images/IEEE.JPG");
      awardEntity3.setProperty("description", "First Author Acceptance to IEEE Vis 2019");
      
      Entity awardEntity4 = new Entity("award", "fourth");
      awardEntity4.setProperty("year", 2019);
      awardEntity4.setProperty("image", "../../assets/images/Stage.JPG");
      awardEntity4.setProperty("description", "First-author");

      Entity awardEntity5 = new Entity("award", "fifth");
      awardEntity5.setProperty("year", 2020);
      awardEntity5.setProperty("image", "../../assets/images/cra.PNG");
      awardEntity5.setProperty("description", "CRA Outstanding Undergraduate Reserach Honorable Mention");

      Entity awardEntity6 = new Entity("award", "sixth");
      awardEntity6.setProperty("year", 2020);
      awardEntity6.setProperty("image", "../../assets/images/Admissions.png");
      awardEntity6.setProperty("description", "Notre Dame Admissions Video");

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      List<Entity> awards = Arrays.asList(awardEntity, awardEntity2, awardEntity3, awardEntity4, awardEntity5, awardEntity6);
      datastore.put(awards);
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    Query query = new Query("award").addSort("year", SortDirection.ASCENDING);;
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Award> awards = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      long year = (long) entity.getProperty("year");
      String image = (String) entity.getProperty("image");
      String description = (String) entity.getProperty("description");

      Award award = new Award(year, image, description);
      awards.add(award);

    }

    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(awards));
  }
}