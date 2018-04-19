// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This file contains the constant strings to be used in the code logic to allow for easy editing
 * Below are eslint comments to enforce JSON like syntax since strings are usually stored in JSON
 * They are written in JavaScript for easier organization of the data and in case functions are used
 */

/* eslint quote-props: ["error", "always"] */
/* eslint quotes: ["error", "double"] */

// eslint-disable-next-line quotes
const deepFreeze = require('deep-freeze');

const schedules = [
  {
    "time": "9:00 AM",
    "title": "Keynote",
    "room": "Ballroom A",
    "type": "Event",
    "description": "Keynote",
    "speaker": "Paige Bailey",
    "date": "April 20th"
  },
  {
    "time": "10:45 AM",
    "title": "Hololens Mixed Reality for Fun and Profit",
    "room": "Ballroom B",
    "type": "Developer",
    "description": "What innovations are the current generation of mixed reality devices capable of providing? Lets explore what a commercial augmented reality solution might look like using the Microsoft Hololens and how you can get started building real business solutions.",
    "speaker": "Gaines Kergosien",
    "date": "April 20th"
  },
  {
    "time": "10:45 AM",
    "title": "Winning Design and UX for Reporting Solution in Angular",
    "room": "300D",
    "type": "Developer",
    "description": "There are a lot of reporting solutions out there. But what makes for a good design of a report? And what gives the best user experience? In this discussion, we will look at answering these two questions by building a team performance report hosted in an Angular application. Reporting best practices to create professional reports:  What are the basics of a good report design? How to avoid the common pitfalls of reporting? How to create practical reports leveraging the features of ActiveReports? Creating an elegant user experience: What are the ingredients for a great UX? How to build a clean and modern UI? How to maximize report usability (intuitive design) and re-usability (re-using the report based on customer interaction such as filtering relevant data based on user role ",
    "speaker": "Mateen Firoz",
    "date": "April 20th"
  },
  {
    "time": "12:45 PM - 1:45 PM",
    "title": "Using Google Dialogflow to build voice and text conversational apps",
    "room": "Ballroom B ",
    "type": "Developer",
    "description": "From chatbots to IoT devices, conversational apps provide a richer and more natural experience for users. Dialogflow from Google, helps to build apps with conversational interaction powered by machine learning. Dialogflow uses natural language processing to build conversational app and deploy it on your website, your app or 32 different platforms, including the Google Assistant and other popular messaging services. Dialogflow also supports multiple languages and multilingual experiences so you can reach users around the world.. This session helps to learn building conversational apps using Dialogflow from basic to to a complete chatbot app.",
    "speaker": "Suneel Kancherla",
    "date": "April 21th"
  },
  {
    "time": "10:45 AM",
    "title": "Recruiters Suck. Use them.",
    "room": "300C",
    "type": "ITPro",
    "description": "In today’s tech market there are a bajillion recruiters and trying to work with us is a pain. In this talk I will be answering any and all questions you have always wanted to ask a recruiter. I will also be discussing how to position yourself in the market when looking for a new job. In today’s tech market there are more recruiters than JavaScript libraries. And just like JavaScript libraries, it’s hard to pick a good recruiter that that won’t burn out in 6 months. In this open forum talk, I will be answering any and all questions you have always wanted to ask us. Like how do we price positions? What do I look for when working with a recruiter? I will also give tips to everyone like how to write a good resume, are cover letters still relevant, how do I approach a job hunt, and what can make you the most attractive as a candidate in the interview process. This talk is geared for the recent software school grad to the Architect who has recently found themselves back on the job market. I look forward to answering all your questions!",
    "speaker": "Taylor Desseyn",
    "date": "April 20th"
  },
  {
    "time": "10:45 AM",
    "title": "DevOps, Continuous Integration & Database Lifecycle Management: Rule them all",
    "room": "300B",
    "type": "DevOps",
    "description": "Do you want to make your deployments risk free? Do you want to deliver business values to your customers faster? Do you want to increase the efficiency of your Team? Are your application and database deployment separate processes? Do you encounter issues while deploying your database changes? Is your database slowing you down? If the answer to any of the above questions is a Yes, then this presentation is for YOU. Come join me in this 60 min session to understand the problems with traditional database development, why organizations are moving towards achieving Continuous Integration and Database DevOps, the problems it tries to solve and learn about the toolsets which will assist you in this journey towards painless database deployments.",
    "speaker": "Samir Behara",
    "date": "April 20th"
  },
  {  
    "time": "3:30 PM : 4:30 PM",
    "title": "Enhance Your Career with a Mastermind Group",
    "room": "301D/Kevin Griffin",
    "type": "Entrepreneur",
    "description": "What do King Arthur, Franklin D. Roosevelt, Andrew Carnegie, and Napoleon all have in common? Each of them belonged to groups called Masterminds, or brain trusts. The term was originally coined back in 1937, but the concept has survived the test of time. By surrounding yourself with like-minded individuals, each coming into the conversation with their own thoughts, perspective, and motivations, the overall group can lift themselves to a higher level. You don't need to wear a crown or command an army to be in a mastermind group. Average people every day meet and discuss their careers and personal lives within constructive, judgement-free zones. Do you find yourself going to work each day without direction? Do you feel like you are the only person in the world with the problems you're facing? A mastermind group would help you push forward. This presentation will discuss how to join or organize a mastermind group, including meeting structure and timing. What are the do's and don'ts? How can every member benefit? Come learn and take your career to the next level.",
    "speaker": "Kevin Griffin",
    "date": "April 20th"
  }
];

const general = {
  "heardItAll": "Actually it looks like you heard it all. Thanks for listening!",
  /** Used to give responses for no inputs */
  "noInputs": [
    "I didn't hear that.",
    "If you're still there, say that again.",
    "We can stop here. See you soon."
  ],
  "suggestions": {
    /** Google Assistant will respond to more confirmation variants than just these suggestions */
    "confirmation": [
      "Sure",
      "No thanks"
    ]
  },
  "nextSchedule": "Would you like to see  another schedule?",
  "linkOut": "Learn more",
  "wantWhat": "So what would you like to hear about?",
  "unhandled": "Welcome to Facts about Google! I'd really rather not talk about %s. Wouldn't you rather talk about Google? I can tell you about Google's history or its headquarters. Which do you want to hear about?"
};

// Use deepFreeze to make the constant objects immutable so they are not unintentionally modified
module.exports = deepFreeze({
  schedules,
  general
});
