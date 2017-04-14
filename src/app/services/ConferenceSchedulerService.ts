import * as _ from "lodash";
import {Injectable} from '@angular/core';

class Talk {
	public name:string;
	public minutes:number;

	constructor(name:string, minutes:number) {
		this.name = name;
		this.minutes = minutes;
	}
}

@Injectable()
export class ConferenceSchedulerService {

	private readonly morningSessionMaxLength:number = 180;
	private readonly afternoonSessionMaxLength:number = 240;

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

	public schedule(rawInput:string):void {
		let input:Talk[] = _.orderBy(this.parseInput(rawInput), ['minutes'], ['desc']);

		// Assumptions: 
		// 1. There is no minimum talk time, maximum talk time is 4 hours, unit of time is 1 minute
		// 2. A session can have no talks in it, i.e. There could be an afternoon session with no morning session

		console.log(input);
	}

}