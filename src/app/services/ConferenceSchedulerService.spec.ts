import { AppComponent } from '../app.component';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConferenceSchedulerService } from './ConferenceSchedulerService';

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
Common Ruby Errors 180min`
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
      conferenceSchedulerService.schedule(input);
    }));
  } 

  for(var i = 0; i < testInputs.length; i++) {
    testSchedule(testInputs[i], i);
  }

});