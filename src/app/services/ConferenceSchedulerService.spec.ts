import { AppComponent } from '../app.component';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConferenceSchedulerService } from './ConferenceSchedulerService';
import { Track } from '../models/TrackModel';
import { Talk } from '../models/TalkModel';

import * as _ from "lodash";
import * as moment from 'moment/moment';

describe('Conference Scheduler Service', function () {

  let testInputs:string[] = [
        `Writing Fast Tests Against Enterprise Rails 60min
Overdoing it in Python 45min
Lua for the Masses 30min
Ruby Errors from Mismatched Gem Versions 45min
Common Ruby Errors 45min
Rails for Python Developers lightning
Communicating Over Distance 60min
Accounting-Driven Development 45min
Woah 30min
Sit Down and Write 30min
Pair Programming vs Noise 45min
Rails Magic 60min
Ruby on Rails: Why We Should Move On 60min
Clojure Ate Scala (on my project) 45min
Programming in the Boondocks of Seattle 30min
Ruby vs. Clojure for Back-End Development 30min
Ruby on Rails Legacy App Maintenance 60min
A World Without HackerNews 30min
User Interface CSS in Rails Apps 30min`,

        `Writing Fast Tests Against Enterprise Rails lightning`,

        `Writing Fast Tests Against Enterprise Rails 6min
Overdoing it in Python 7min
Lua for the Masses 8min
Ruby Errors from Mismatched Gem Versions 120min
Common Ruby Errors 180min`,

        `Writing Fast Tests Against Enterprise Rails 6min
Overdoing it in Python 45min
Lua for the Masses 3min
Ruby Errors from Mismatched Gem Versions 4min
Common Ruby Errors 7min
Rails for Python Developers lightning
Communicating Over Distance 173min
Accounting-Driven Development 205min
Woah 3min
Sit Down and Write 5min
Pair Programming vs Noise 79min
Rails Magic 12min
Ruby on Rails: Why We Should Move On 3min
Clojure Ate Scala (on my project) 1min
Programming in the Boondocks of Seattle 100min
Ruby vs. Clojure for Back-End Development 69min
Ruby on Rails Legacy App Maintenance 17min
A World Without HackerNews 8min
User Interface CSS in Rails Apps 64min`
      ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConferenceSchedulerService
      ]
    });
  });


  function testSchedule(input:string, caseNumber:number) {
    it('should be able to schedule a conference given an input string, case: ' + caseNumber, inject([ConferenceSchedulerService], (conferenceSchedulerService:ConferenceSchedulerService) => {
      let tracks:Track[] = conferenceSchedulerService.schedule(input);

      // The conference has multiple tracks each of which has a morning and afternoon session.
      expect(tracks.length > 0).toBeTruthy();

      _.forEach(tracks, (track:Track) => {
        // Morning sessions begin at 9am and must finish by 12 noon, for lunch.
        if(track.morningSession.talks.length > 0) {
          expect(_.first(track.morningSession.talks).startTime.format('HH:mm:ss')).toEqual('09:00:00');
        }

        let lastMorningTalk:Talk = _.last(track.morningSession.talks);

        if(lastMorningTalk) {
          expect(lastMorningTalk.startTime.clone().add(lastMorningTalk.minutes, 'minutes').isBefore(moment().set({'hour':12, 'minute':0, 'second':0}))).toBeTruthy();
        }

        // Afternoon sessions begin at 1pm and must finish in time for the networking event.
        expect(_.first(track.afternoonSession.talks).startTime.format('HH:mm:ss')).toEqual('13:00:00');
        
        // The networking event can start no earlier than 4:00 and no later than 5:00.
        let networkingEvent:Talk = _.last(track.afternoonSession.talks);
        expect(networkingEvent.startTime.isBetween(moment().set({'hour':15, 'minute':59, 'second':59}), moment().set({'hour':17, 'minute':0, 'second':0}))).toBeTruthy();
      });
    }));
  } 

  for(var i = 0; i < testInputs.length; i++) {
    testSchedule(testInputs[i], i);
  }

});