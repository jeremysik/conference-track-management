import { AppComponent } from '../app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Talk } from './TalkModel';

import { AFTERNOON_SESSION_MAX_LENGTH } from './TrackModel'

import * as moment from 'moment/moment';

describe('Talk Model', function () {

  it('should be able to create a Talk and set it\'s name and minutes', () => {
    let talk = new Talk('name', 10);

    expect(talk.name).toEqual('name');
    expect(talk.minutes).toEqual(10);
    expect(talk.startTime).toBeNull();
  });

  it('should be able to set a Talk\'s startTime', () => {
    let talk = new Talk('name', 10);

    talk.startTime = moment().set({'hour':16, 'minute':0, 'second':0});

    expect(talk.startTime.format('HH:mm:ss')).toEqual('16:00:00');
  });

  it('should throw an exception if you try to exceed maximum talk time', () => {

    let throwsException = () => {
      let talk = new Talk('name', AFTERNOON_SESSION_MAX_LENGTH + 10);
    };

    expect(throwsException).toThrow();

  });

});