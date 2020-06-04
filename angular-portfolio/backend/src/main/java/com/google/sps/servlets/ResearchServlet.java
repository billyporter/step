package com.google.sps.servlets;


import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.sps.data.Research;
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

/** Servlet responsible for loading research. */
@WebServlet("/load-research")
public class ResearchServlet extends HttpServlet {

  public void init(ServletConfig config) {

      Entity researchEntity = new Entity("Research", "first");
      researchEntity.setProperty("title", "Massachusetts General Hospital");
      researchEntity.setProperty("date", "November 2016 - Aug 2018");
      researchEntity.setProperty("outcome", "Solved a  65-year old problem by the creation the MAD-Score: a statistical" +
      "comparison metric for identifying differentially abundant cell populations in" +
      "low-sample size CyTOF data that is >25% more accurate than the industry standard" +
      "and for outlier detection with >95% accuracy.");

      Entity researchEntity2 = new Entity("Research", "second");
      researchEntity2.setProperty("title", "Harper Cancer Center");
      researchEntity2.setProperty("date", "Sep 2018 - Present");
      researchEntity2.setProperty("outcome", "Discovered " +
      "why the combination treatment of ICB and epigenetic-modulator drugs is effective at " +
      "treating resistant prostate tumors when previous methods failed");

      Entity researchEntity3 = new Entity("Research", "third");
      researchEntity3.setProperty("title", "Deep Learning Research");
      researchEntity3.setProperty("date", "Oct 2018 - Present");
      researchEntity3.setProperty("outcome", "First-author of" +
      " the research paper “A Deep Learning Approach to Selecting Representative Time-Steps for " +
      "Time-Varying Multivariate Data” that was accepted to IEEE Vis 2019, the #1 conference in " +
      "data visualization");

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      List<Entity> researches = Arrays.asList(researchEntity, researchEntity2, researchEntity3);
      datastore.put(researches);
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    Query query = new Query("Research");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Research> researches = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      String title = (String) entity.getProperty("title");
      String date = (String) entity.getProperty("date");
      String outcome = (String) entity.getProperty("outcome");

      Research research = new Research(title, date, outcome);
      researches.add(research);

    }

    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(researches));

  }
}