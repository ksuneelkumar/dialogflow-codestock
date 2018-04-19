/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment');
const { DialogflowApp, Responses } = require('actions-on-google');
const maps = require('@google/maps');
const config = functions.config();
const { RichResponse, BasicCard } = Responses;
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
const scheduleData = require('./data');
// Wikipedia link and image URLs

const codestockImageUrl = "https://pbs.twimg.com/profile_images/512627590209605632/3B-s08QB_400x400.png";
const codestockUrl = "https://codestock.org";
const codestockScheduleUrl = "https://portal.codestock.org/home/schedule";
const STATIC_MAPS_ADDRESS_IMAGE = 'https://maps.googleapis.com/maps/api/staticmap?center=701+Henley+Street+Knoxville,+TN+37902&zoom=13&scale=1&size=300x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C701+Henley+Street+Knoxville,+TN+37902';
const STATIC_MAPS_LOCATION = "https://goo.gl/maps/SgsevecNDsM2";
const STATIC_MAPS_SIZE = '640x640';
const url = require('url'); 

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  const app = new DialogflowApp({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  var Fulltextsearchlight = require('full-text-search');
  var search = new Fulltextsearchlight();
  
  /** @param {Array<string>} messages The messages to concat */
  const concat = messages => messages.map(message => message.trim()).join(' ');
  
  function scheduleByCategory (agent) {
    const scheduleContext = agent.getContext('schedule-category');
    console.log(scheduleContext.parameters["category.original"]);
    const scheduleType = scheduleContext.parameters["category.original"];
    for (const schedule of scheduleData.schedules) {
      // Initialize categories with all the facts if they haven't been read
      search.add(schedule);
    }
  
    /** @type {boolean} */
    const scheduleSearchResults = search.search(scheduleType);
    if (!scheduleSearchResults) {
      /** @type {string} */
      const action = agent.getIntent();
      console.error(`${parameter} parameter is unrecognized or ` +
        `not provided by Dialogflow ${action} action`);
      return;
    }
    let responseCards = [];
    for (const scheduleResult of scheduleSearchResults ){
     
      responseCards.push(new Card({
        title: scheduleResult.title + ' By ' + scheduleResult.speaker,
        imageUrl: codestockImageUrl,
        text: scheduleResult.description,
        buttonText: scheduleResult.time + '/' +scheduleResult.room,
        buttonUrl: codestockScheduleUrl
      }));
    }

    const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    if (!screenOutput) {
      agent.add(`Here are the schedules`);
      for (const responseCard of responseCards ){
        agent.add(responseCard);
      }
    } else { 
      return app.ask(concat([schedule[0].title + ' By ' + schedule[0].speaker + ' At ' + schedule[0].time + ' in ' + schedule[0].room, scheduleData.general.nextSchedule]), scheduleData.general.noInputs);
    }
    
  }

  function location(agent) {
      const mapViewURL = url.format(STATIC_MAPS_ADDRESS_IMAGE)
      const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
      if (!screenOutput) {
        agent.add(`Here is the location.`);
        agent.add(`Knoxville Convention Center.  701 Henley Street Knoxville, TN 37902`);
        agent.add(new Card({
          title: "Venue",
          imageUrl: mapViewURL,
          text: `Location for codestock`,
          buttonText: `Click for directions`,
          buttonUrl: STATIC_MAPS_LOCATION
        }));
        agent.add(new Suggestion(`Need a place to stay ?`));
      } else { 
        return app.ask(`It is happening in Knoxville Convention Center.  701 Henley Street Knoxville, TN 37902`);
      } 
  }
 
  function welcome(agent) {
    agent.add(`Welcome to the codestock!`);
    agent.add(new Card({
        title: `Codestock 2018`,
        imageUrl: codestockImageUrl,
        text: `A gathering of working professionals sharing knowledge and experience`,
        buttonText: 'Code stock web', 
        buttonUrl: codestockUrl
      })
    );
    agent.add(`What do you like to learn more ?`);
    agent.add(new Suggestion(`Schedules`));
    agent.add(new Suggestion(`Academy`));
    agent.add(new Suggestion(`Sponsors`));
  }

  function fallback(agent) {
    agent.add(`I didn't get that, can you try again?`);
  }

  let intentMap = new Map(); // Map functions to Dialogflow intent names
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('schedules-by-category', scheduleByCategory);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('codestock-location', location);
  agent.handleRequest(intentMap);
});
