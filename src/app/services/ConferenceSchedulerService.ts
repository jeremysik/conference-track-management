import * as _ from "lodash";
import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';

import { Session } from '../models/SessionModel';
import { Talk } from '../models/TalkModel';
import { Track } from '../models/TrackModel';

@Injectable()
export class ConferenceSchedulerService {

	private parseInput(rawInput:string):Talk[] {
		return _.map(_.split(rawInput, '\n'), (rawLine:string) => this.parseLine(rawLine));
	}

	private parseLine(rawLine:string):Talk {
		let toSplitBy:string|RegExp = _.includes(rawLine, 'lightning') ? 'lightning' : /[0-9]/,
			talkName:string = _.trim(_.split(rawLine, toSplitBy)[0]),
			talkTimeMinutes:number = 5; // First assume 'lightning'

		if(toSplitBy != 'lightning') {
			talkTimeMinutes = parseInt(_.trim(_.trim(_.split(rawLine, talkName)[1]), 'min'));
		}

		return new Talk(talkName, talkTimeMinutes);
	}

	public schedule(rawInput:string):Track[] {
		let talks:Talk[] = _.orderBy(this.parseInput(rawInput), ['minutes'], ['desc']);

		// Assumptions: 
		// 1. There is no minimum talk time, maximum talk time is 4 hours, unit of time is 1 minute
		// 2. The morning session can finish any time before lunch (12:00)
		// 3. The afternoon session can finish any time before the networking event (16:00-17:00 start)

		// Despite the rule 'The conference has multiple tracks each of which has a morning and afternoon session.',
		// I have made the assumption:
		// 4. A session can have no talks in it, i.e. There could be an afternoon session with no morning session
		// ...because if there is between 1 and 1.5 tracks of talks it doesn't make sense to put a single talk in a
		// session by itself if it can fit into the other session on that day.

		let tracks:Track[] = [new Track()];

		_.forEach(talks, (talk:Talk) => {
			let talkPlaced:boolean = false;

			_.forEach(tracks, (track:Track) => {
				if(talkPlaced) {
					return false; // Break out of forEach
				}
				else if(track.afternoonSession.freeMinutes() >= talk.minutes) {
					track.afternoonSession.addTalk(talk);
					talkPlaced = true;
				}
				else if(track.morningSession.freeMinutes() >= talk.minutes) {
					track.morningSession.addTalk(talk);
					talkPlaced = true;
				}
			});

			if(!talkPlaced) {
				let newTrack:Track = new Track();
				newTrack.afternoonSession.addTalk(talk);
				tracks.push(newTrack);
			}
		});

		// Place all Networking Events
		_.forEach(tracks, (track:Track) => {
			track.afternoonSession.addNetworkingEvent();
		});

		return tracks;
	}

}