import * as moment from 'moment/moment';

import { AFTERNOON_SESSION_MAX_LENGTH } from './TrackModel'

export class Talk {
	public name:string;
	public minutes:number;
	public startTime:moment.Moment = null;

	constructor(name:string, minutes:number) {
		this.name = name;
		if(minutes > AFTERNOON_SESSION_MAX_LENGTH) {
			throw 'Talk length can\'t exceed ' + AFTERNOON_SESSION_MAX_LENGTH + ' minutes (' + this.name + ')';
		}
		this.minutes = minutes;
	}
}