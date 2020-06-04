package com.google.sps.data;

/** An item on a award list. */
public final class Award {

  private final long year;
  private final String image;
  private final String description;

  public Award(long year, String image, String description) {
    this.year = year;
    this.image = image;
    this.description = description;
  }
}