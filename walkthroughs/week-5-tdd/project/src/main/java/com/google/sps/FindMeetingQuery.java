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

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.List;
import java.util.ArrayList;
import java.util.BitSet;
import org.paukov.combinatorics3.Generator;

/** Class to Find meeting time that works for attendees */
public final class FindMeetingQuery {
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        // filter events by attendees and extract time ranges
        ArrayList<TimeRange> masterTimes = events.stream()
                .filter(event -> !Collections.disjoint(request.getAttendees(), event.getAttendees()))
                .map(Event::getWhen).collect(Collectors.toCollection(ArrayList::new));

        // Initialize bitset to represent every opening in 5 minute increments
        int sizeOfBitSet = (int) ((int) (TimeRange.END_OF_DAY + 1 - TimeRange.START_OF_DAY) / 5);
        BitSet masterOpenings = new BitSet(sizeOfBitSet);
        for (int i = 0; i <= sizeOfBitSet; i++) {
            masterOpenings.set(i * 5 + TimeRange.START_OF_DAY);
        }

        /*
         * Create bitset representing when an attendee is busy, use bit operations to
         * exclude from master
         */
        BitSet singleOpenings = timeRangeToBitSet(masterTimes, sizeOfBitSet);
        BitSet optionOpenings = optionBit(singleOpenings, request.getOptionalAttendees(), events, sizeOfBitSet,
                (int) request.getDuration());
        // if there is an optional schedule that works, set master to it
        if (optionOpenings.length() > 1) {
            masterOpenings.and(optionOpenings);
        } // if the optional schedule is length 1, that means required and options are
          // both clear
        else if (optionOpenings.length() == 1) {
            masterOpenings.clear();
        } // if no optional works but some required works, set overlap with requireds
        else {
            masterOpenings.andNot(singleOpenings);
        }

        // convert bit to an int array of pairs of intervals
        int[] openingsArray = masterOpenings.stream()
                .filter(s -> (s == 0 || (!masterOpenings.get(s - 5)) || !masterOpenings.get(s + 5))).toArray();

        // build collection
        Collection<TimeRange> meetingTimes = new ArrayList<TimeRange>();
        int addStart, addEnd, start, end;

        // Loop through array, if bigger than duration then add to output
        for (int a = 0; a < openingsArray.length; a += 2) {
            addStart = 5;
            addEnd = 5;
            if (openingsArray[a] == TimeRange.START_OF_DAY)
                addStart = 0;
            if (openingsArray[a + 1] >= TimeRange.END_OF_DAY)
                addEnd = 0;
            start = openingsArray[a] - addStart;
            end = openingsArray[a + 1] + addEnd;
            if (end - start >= request.getDuration()) {
                meetingTimes.add(TimeRange.fromStartEnd(start, end, false));
            }
        }
        return meetingTimes;
    }

    /*
     * Function to convert a List of time ranges to a single bitset Can be an
     * arbitrary length of time ranges
     */
    public BitSet timeRangeToBitSet(ArrayList<TimeRange> timeRanges, int sizeOfBitSet) {
        BitSet condensedSet = new BitSet(sizeOfBitSet);
        for (int c = 0; c < timeRanges.size(); c++) {
            condensedSet.set(timeRanges.get(c).start(), timeRanges.get(c).end() + 1);
        }
        return condensedSet;
    }

    /*
     * Returns bitset of schedule that fits the highest number of optional attendees
     * or a clear bitset if none can attend
     */
    public BitSet optionBit(BitSet singleOpenings, Collection<String> optionPeople, Collection<Event> events,
            int sizeOfBitSet, int duration) {

        // create array list of times of just the events optional people attended
        ArrayList<ArrayList<TimeRange>> optionTimes = new ArrayList<ArrayList<TimeRange>>(optionPeople.size());
        for (String person : optionPeople) {
            optionTimes.add(events.stream().filter(event -> event.getAttendees().contains(person)).map(Event::getWhen)
                    .collect(Collectors.toCollection(ArrayList::new)));
        }

        // convert the time ranges to bitSets
        ArrayList<BitSet> optionBitSets = new ArrayList<BitSet>();
        for (int i = 0; i < optionTimes.size(); i++) {
            BitSet tempBit = timeRangeToBitSet(optionTimes.get(i), sizeOfBitSet * 5);
            optionBitSets.add(tempBit);
        }

        // generate a list of all combinations of attendees
        List<List<BitSet>> subsets = Generator.subset(optionBitSets).simple().stream()
                .collect(Collectors.<List<BitSet>>toList());

        // initialize variables for for loop
        boolean isValidSchedule = false;
        int highestCombo = 0;
        BitSet singleComboBitSet = new BitSet(sizeOfBitSet * 5);
        BitSet optionSet = new BitSet(sizeOfBitSet * 5);

        // loop through combinations to determine schedule that fits most attendees
        for (int i = 0; i < subsets.size(); i++) {
            isValidSchedule = false;
            if (subsets.get(i).size() > 0) {
                singleComboBitSet = multipleBitsToOne(subsets.get(i), singleOpenings, sizeOfBitSet * 5);
                isValidSchedule = optionBitHelper(singleComboBitSet, duration);
            }
            if (isValidSchedule && subsets.get(i).size() > highestCombo) {
                highestCombo = subsets.get(i).size();
                optionSet = singleComboBitSet;
            }
        }

        // if no schedule works for optional attendees and there are no required
        // attendees
        if (singleOpenings.isEmpty() && highestCombo == 1) {
            optionSet.clear();
            optionSet.set(0);
        }
        return optionSet;
    }

    /*
     * Takes in a bitset of what times work for a combination of optional attendees
     * Determines if there is at least one duration that can fit a meeeting
     */
    public boolean optionBitHelper(BitSet singleComboBitSet, int duration) {
        BitSet tempBit = (BitSet) singleComboBitSet.clone();
        int[] checker = tempBit.stream().filter(s -> tempBit.nextClearBit(s) - s + 2 >= duration).toArray();
        if (checker.length > 0) {
            return true;
        }
        return false;
    }

    /*
     * Takes in X number of bitsets of optional attendees of times that do not work
     * Returns the bitset that works for all of them
     */
    public BitSet multipleBitsToOne(List<BitSet> subsets, BitSet singleOpenings, int sizeOfBitSet) {
        BitSet tempBit = (BitSet) singleOpenings.clone();
        for (int i = 0; i < subsets.size(); i++) {
            tempBit.or(subsets.get(i));
        }
        tempBit.flip(0, sizeOfBitSet + 1);
        return tempBit;
    }
}
