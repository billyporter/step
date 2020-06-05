
package com.google.sps.data;

import java.util.HashMap;

/** Data class that builds hash maps of users and corresponding comments */
public class CommentSection {
    private HashMap<String, String> commentMap = new HashMap<String, String>();
    public void postComment(String userName, String commentText) {
        commentMap.put(userName, commentText);
    }
}