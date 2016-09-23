'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.cf49c20b-96c9-4229-9ac1-723362eb6693';
var SKILL_NAME = 'Dice Roll';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var begin = [
    "Ok, I roll one dice ... ",
    "Ok, let's go for one dice",
    "Got it! I roll one dice",
    "The dice is rolled",
    "Alea iacta est!",
    "OK, master, let me roll a dice for you."
]

var end = [
    "Oh ! it's a {0}",
    "Hey ! it's a {0}",
    "Well done, it's a {0} ",
    "Nice throw, it's a {0}",
    "And the result is, a {0}",
    "And it's a {0}",
    "Oh you're lucky, you got a {0}",
    "Okay, it's a {0}",
    "Well, it seems it's a {0}",
    "Damn, I lost the dice, try again"
]

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

var handlers = {
    'LaunchRequest': function () {
        console.log('LaunchRequest');
        this.emit('ResponseIntent');
    },
    'DiceRollerIntent': function () {
        console.log('DiceRollerIntent');
        this.emit('ResponseIntent');
    },
    'ResponseIntent': function () {

        var result = Math.floor(Math.random()*6)+1;
        var speechOutput = begin[Math.floor(Math.random()*begin.length)];
        speechOutput+="<break time='0.7s' />";
        speechOutput+=end[Math.floor(Math.random()*end.length)].format(result);

        this.emit(':tell', speechOutput, SKILL_NAME, speechOutput);

    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask me to roll a dice, just ask Alexa <break time='0.3s' /> start dice roller";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};

