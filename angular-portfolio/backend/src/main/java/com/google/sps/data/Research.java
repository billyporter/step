package com.google.sps.data;

/** An item on a comment list. */
public final class Research {

  private final String title;
  private final String date;
  private final String outcome;

  public Research(String title, String date, String outcome) {
    this.title = title;
    this.date = date;
    this.outcome = outcome;
  }
}