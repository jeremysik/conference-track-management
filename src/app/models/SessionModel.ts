import * as moment from 'moment/moment';
import * as _ from "lodash";
import { Talk } from './TalkModel';

export class Session {

	private maxSessionLength:number;
	private startTime:moment.Moment;

	private _talks:Talk[] = [];

	constructor(maxSessionLength:number, startTime:moment.Moment) {
		this.maxSessionLength = maxSessionLength;
		this.startTime = startTime;
	}

	public freeMinutes():number {
		return this.maxSessionLength - _.sumBy(this._talks, (talk:Talk) => talk.minutes);
	}

	public addTalk(talk:Talk):boolean {
		if(talk.minutes > this.freeMinutes()) {
			return false;
		}
		else {
			// Default start time is start of session
			talk.startTime = this.startTime.clone();

			if(this._talks.length > 0) {
				talk.startTime = _.last(this._talks).startTime.clone().add(_.last(this._talks).minutes, 'minutes');
			}

			this._talks.push(talk);
			return true;
		}
	}

	get talks():Talk[] {
		return this._talks;
	}

	public addNetworkingEvent():boolean {
		let networkingEvent:Talk = new Talk('Networking Event', 60),
			lastTalk = _.last(this.talks);

		networkingEvent.startTime = moment().set({'hour':16, 'minute':0, 'second':0});

		if(lastTalk && lastTalk.startTime.clone().add(lastTalk.minutes, 'minutes').isAfter(moment().set({'hour':15, 'minute':59, 'second':59}))) {
			networkingEvent.startTime = lastTalk.startTime.clone().add(lastTalk.minutes, 'minutes');
		}

		this._talks.push(networkingEvent);
		return true;
	}

}