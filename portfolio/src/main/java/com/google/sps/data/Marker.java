// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.data;

import com.google.appengine.api.datastore.Entity;

/** Represents a marker on the map. */
public class Marker {

  private final double lat;
  private final double lng;
  private final String content;

  public Marker(double lat, double lng, String content) {
    this.lat = lat;
    this.lng = lng;
    this.content = content;
  }

  public double getLat() {
    return lat;
  }

  public double getLng() {
    return lng;
  }

  public String getContent() {
    return content;
  }

  /**
   * Initalizes a new Marker from an entity of kind "Marker".
   * @param {Entity} markerEntity
   */
  public static Marker fromEntity(Entity markerEntity){
    Double lat = (Double) markerEntity.getProperty("lat");
    Double lng = (Double) markerEntity.getProperty("lng");
    String content = (String) markerEntity.getProperty("content");
    return new Marker(lat, lng, content);
  }

  /**
   * Initializes a new Entity from a Marker instance.
   * @param {Marker} marker
   */
  public static Entity toEntity(Marker marker){
    Entity markerEntity = new Entity("Marker");
    markerEntity.setProperty("lat", marker.lat);
    markerEntity.setProperty("lng", marker.lng);
    markerEntity.setProperty("content", marker.content);
    return markerEntity;
  }
}
