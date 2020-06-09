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

      Entity awardEntity = createNewEntity("first", 2018, "VR.JPG", 
                                            "Hesburgh-Yusko Scholarship");
      Entity awardEntity2 = createNewEntity("second", 2018, "MAD.JPG", 
                                            "MAD-Score Creator and Publication");
      Entity awardEntity3 = createNewEntity("third", 2019, "IEEE.JPG", 
                                            "First Author Acceptance to IEEE Vis 2019");
      Entity awardEntity4 = createNewEntity("fourth", 2019, "Stage.JPG", 
                                            "Spoke at Congress of Future Medical Leaders");
      Entity awardEntity5 = createNewEntity("fifth", 2020, "cra.PNG", 
                                            "CRA Outstanding Undergraduate Reserach Honorable Mention");
      Entity awardEntity6 = createNewEntity("sixth", 2020, "Admissions.png", 
                                            
                                            "Notre Dame Admissions Video");
      
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      List<Entity> awards = Arrays.asList(awardEntity, awardEntity2, 
                                          awardEntity3, awardEntity4, 
                                          awardEntity5, awardEntity6);
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

  private Entity createNewEntity(String key, long year, String image, String description) {
    Entity awardEntity = new Entity("award", key);
    awardEntity.setProperty("year", year);
    awardEntity.setProperty("image", "../../assets/images/" + image);
    awardEntity.setProperty("description", description);
    return awardEntity;
  }
}