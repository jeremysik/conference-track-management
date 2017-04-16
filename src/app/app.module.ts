import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }  from '@angular/common'
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent }  from './app.component';

import { MaterialModule } from '@angular/material';

import { ConferenceSchedulerService } from './services/ConferenceSchedulerService';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	CommonModule,
  	FormsModule,
  	FlexLayoutModule,
  	MaterialModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:	[
  	ConferenceSchedulerService
  ],
})
export class AppModule { }
