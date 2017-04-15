import * as moment from 'moment/moment';
import { Session } from './SessionModel';

const MORNING_SESSION_MAX_LENGTH:number = 180;
export const AFTERNOON_SESSION_MAX_LENGTH:number = 240; // Assume that this will always be longer than morning session length

export class Track {
	public morningSession:Session;
	public afternoonSession:Session;

	constructor() {
		this.morningSession = new Session(MORNING_SESSION_MAX_LENGTH, moment().set({'hour':9, 'minute':0, 'second':0}));
		this.afternoonSession = new Session(AFTERNOON_SESSION_MAX_LENGTH, moment().set({'hour':13, 'minute':0, 'second':0}));
	}

}