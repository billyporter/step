
package com.google.sps.data;

import java.util.HashMap;

public class CommentSection {

    // Build hash map of username and comment
    private HashMap<String, String> commentMap = new HashMap<String, String>();

    public void postComment(String userName, String commentText) {
        commentMap.put(userName, commentText);
    }

}