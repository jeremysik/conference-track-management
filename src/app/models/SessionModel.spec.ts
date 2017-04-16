import { AppComponent } from '../app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Session } from './SessionModel';
import { AFTERNOON_SESSION_MAX_LENGTH } from './TrackModel';
import { Talk } from './TalkModel';

import * as moment from 'moment/moment';
import * as _ from "lodash";

describe('Session Model', function () {

  it('should be able to return the number of free minutes left in the session', () => {
    let session = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0}));

    expect(session.freeMinutes()).toEqual(AFTERNOON_SESSION_MAX_LENGTH);
  });

  it('should be able to create a Session and add a talk', () => {
    let session = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0})),
        first = new Talk('first', 30),
        second = new Talk('second', 15);

    session.addTalk(first);

    expect(session.freeMinutes()).toEqual(210);
    expect(session.talks[0].name).toEqual('first');
    expect(session.talks[0].startTime.format('HH:mm:ss')).toEqual('13:00:00');

    session.addTalk(second);
    expect(session.freeMinutes()).toEqual(195);
    expect(session.talks[1].name).toEqual('second');
    expect(session.talks[1].startTime.format('HH:mm:ss')).toEqual('13:30:00');
  });

  it('should be able to add a networking event', () => {
    let firstSession = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0})),
        longTalk = new Talk('long', AFTERNOON_SESSION_MAX_LENGTH - 30),
        secondSession = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0})),
        thirdSession = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0})),
        shortTalk = new Talk('short', 30);

    firstSession.addTalk(longTalk);
    firstSession.addNetworkingEvent();

    expect(_.last(firstSession.talks).name).toEqual('Networking Event');
    expect(_.last(firstSession.talks).minutes).toEqual(60);
    expect(_.last(firstSession.talks).startTime.format('HH:mm:ss')).toEqual('16:30:00');

    secondSession.addNetworkingEvent();

    expect(_.last(secondSession.talks).name).toEqual('Networking Event');
    expect(_.last(secondSession.talks).minutes).toEqual(60);
    expect(_.last(secondSession.talks).startTime.format('HH:mm:ss')).toEqual('16:00:00');

    thirdSession.addTalk(shortTalk);
    thirdSession.addNetworkingEvent();

    expect(_.last(thirdSession.talks).name).toEqual('Networking Event');
    expect(_.last(thirdSession.talks).minutes).toEqual(60);
    expect(_.last(thirdSession.talks).startTime.format('HH:mm:ss')).toEqual('16:00:00');

  });

});