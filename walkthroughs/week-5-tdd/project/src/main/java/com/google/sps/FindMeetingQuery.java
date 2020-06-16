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

package com.google.sps;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

/**
 * Class that finds suitable times for a group of people to meet.
 **/
public final class FindMeetingQuery {
  /**
   * Returns a list of TimeRanges where a group of people can meet,
   * restrained by the events they have throughout the day.
   *
   * Part the algorithm iterates through the list of events,
   * finding potential time of meetings in-between events. The second
   * part then goes through these potential meeting times and looks for
   * those that satisfy the amount of time that needs to be allotted, as
   * specified in the request.
   *
   * @param {Collection<Event>} events
   * @param {MeetingRequest} request
   */
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<Event> eventsList = new ArrayList<>(events);
    Collection<TimeRange> timeOfMeetings = new ArrayList<>();
    int potentialMeetingTimeStart = TimeRange.START_OF_DAY;
    eventsList.removeIf(event -> Collections.disjoint(request.getAttendees(),
        event.getAttendees()));
    Collections.sort(eventsList, (Event e1, Event e2) ->
        TimeRange.ORDER_BY_START.compare(e1.getWhen(), e2.getWhen()));
    for(Event conflictingEvent : eventsList) {
      int conflictingEventStart = conflictingEvent.getWhen().start();
      int conflictingEventEnd = conflictingEvent.getWhen().end();
      if(conflictingEventStart > potentialMeetingTimeStart) {
        timeOfMeetings.add(TimeRange.fromStartEnd(potentialMeetingTimeStart,
            conflictingEventStart, /*inclusiveEndBound=*/false));
      }
      if(conflictingEventEnd > potentialMeetingTimeStart) {
        potentialMeetingTimeStart = conflictingEventEnd;
      }
    }
    timeOfMeetings.add(TimeRange.fromStartEnd(potentialMeetingTimeStart,
        TimeRange.END_OF_DAY, /*inclusiveEndBound=*/true));
    timeOfMeetings.removeIf(timeRange -> timeRange.duration() < request.getDuration());
    return timeOfMeetings;
  }
}
