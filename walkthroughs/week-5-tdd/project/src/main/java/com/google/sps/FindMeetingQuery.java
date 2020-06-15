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

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<Event> eventsList = new ArrayList<>(events);
    Collection<TimeRange> timeOfMeetings = new ArrayList<>();
    int potentialMeetingTime = TimeRange.START_OF_DAY;
    Collections.sort(eventsList, (Event e1, Event e2) ->
        TimeRange.ORDER_BY_START.compare(e1.getWhen(), e2.getWhen()));
    // Schedules potential meetings inbetween the end time of one event to the start time of another.
    for(Event event: eventsList) {
      // Meeting times should only be checked if the attendees to the event are relevant to the meeting.
      if(request.getAttendees().containsAll(event.getAttendees())) {
        // The end time of one meeting should not be after the start of another + the chunk of time
        // must properly fit the duration the meeting requires
        if(potentialMeetingTime < event.getWhen().start() && 
            event.getWhen().start() - potentialMeetingTime >= request.getDuration()) {
              timeOfMeetings.add(TimeRange.fromStartEnd(potentialMeetingTime, event.getWhen().start(), false));
            }
        // The potential meeting time should only be changed if the end time is greater than the events previous,  
        // Acts as a safeguard for overlapping events.
        if(event.getWhen().end() > potentialMeetingTime) {
            potentialMeetingTime = event.getWhen().end();
        }
      }
    }
    // There is a potential time slot from the end of the last event to the end of the day that has
    // to be checekd.
    if(TimeRange.END_OF_DAY - potentialMeetingTime >= request.getDuration()) {
      timeOfMeetings.add(TimeRange.fromStartEnd(potentialMeetingTime, TimeRange.END_OF_DAY, true));
    }
    return timeOfMeetings;
  }
}
