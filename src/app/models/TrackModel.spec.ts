import { AppComponent } from '../app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Session } from './SessionModel';
import { MORNING_SESSION_MAX_LENGTH, AFTERNOON_SESSION_MAX_LENGTH } from './TrackModel';
import { Track } from './TrackModel';

describe('Track Model', function () {

  it('should be able to create a new track with morning and afternoon sessions', () => {
    let track = new Track();

    expect(track.morningSession.freeMinutes()).toEqual(MORNING_SESSION_MAX_LENGTH);
    expect(track.afternoonSession.freeMinutes()).toEqual(AFTERNOON_SESSION_MAX_LENGTH);
  });

});