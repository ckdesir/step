package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;

/**
 * Class that represents a user comment.
 **/
public class Comment {

  /**
   * Enum that represents the different methods of sorting a Comment
   **/
  public enum SortType {
    // Sort by time of comment, descending
    BY_TIME_DESC, 

    // Sort by time of comment, ascending
    BY_TIME_ASC, 

    // Sort by length of comment, ascending
    BY_COMMENT_LENGTH_ASC,

    // Sort by length of comment, descending
    BY_COMMENT_LENGTH_DESC;
  } 

  private final Date timeOfComment;
  private final String name;
  private final String commentString;

  /**
   * Initializes an object of class Comment
   * @param {Date} timeOfComment - the date the comment was written
   * @param {String} name - the user who wrote the comment
   * @param {String} commentString - the comment that was written
   */
  public Comment(Date timeOfComment, String name, String commentString) {
    this.timeOfComment = timeOfComment;
    this.name = name;
    this.commentString = commentString;
  }

  public Date getTimeOfComment() {
    return timeOfComment;
  }

  public String getName() {
    return name;
  }

  public String getCommentString() {
    return commentString;
  }

  /**
   * Returns a new Comment from an entity of kind "Comment".
   * @param {Entity} commentEntity - entity of kind "Comment" with various 
   *     properties similar to the fields of a Comment object.
   */
  public static Comment fromEntity(Entity commentEntity){
    Date timeOfComment = (Date) commentEntity.getProperty("timeOfComment");
    String name = (String) commentEntity.getProperty("name");
    String commentString = (String) commentEntity.getProperty("commentString");
    return new Comment(timeOfComment, name, commentString);
  }

  /**
   * Returns a new Entity of kind "Comment" from a Comment object.
   * @param {Comment} comment - the Comment object that will be made into an
   *     Entity.
   */
  public static Entity toEntity(Comment comment){
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("name", comment.name);
    commentEntity.setProperty("timeOfComment", comment.timeOfComment);
    commentEntity.setProperty("commentString", comment.commentString);
    commentEntity.setProperty("lengthOfComment", comment.commentString.length());
    return commentEntity;
  }
}
