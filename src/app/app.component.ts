import { Component } from '@angular/core';
import { ConferenceSchedulerService } from './services/ConferenceSchedulerService';
import { Track } from './models/TrackModel';
import * as _ from "lodash";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent  {

	public inputString:string = `Writing Fast Tests Against Enterprise Rails 60min
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
User Interface CSS in Rails Apps 30min`;

	public tracks:Track[] = null;

	constructor(
		private conferenceSchedulerService:ConferenceSchedulerService
	) {
	}

	public compute():void {
		this.tracks = this.conferenceSchedulerService.schedule(this.inputString);
	}

}
