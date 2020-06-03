package com.google.sps.data;

/** An item on a comment list. */
public final class Comment {

  private final long id;
  private final String user;
  private final String commentText;
  private final long timestamp;

  public Comment(long id, String user, String commentText, long timestamp) {
    this.id = id;
    this.user = user;
    this.commentText = commentText;
    this.timestamp = timestamp;
  }
}