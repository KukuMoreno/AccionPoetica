/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const constants = require('./constant');
const logic = require('./logic');
const util = require('./util');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {

        const speakOutput = constants.LAUNCH_MESSAGE + constants.HELP_MESSAGE;

        if (util.supportsAPL(handlerInput)) {
            //const {Viewport} = handlerInput.requestEnvelope.context;
            //const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: constants.APL.launchDoc,
                datasources: {
                    launchData: {
                        type: 'object',
                        properties: {
                            headerTitle: constants.SKILL_NAME, //handlerInput.t('LAUNCH_HEADER_MSG'),
                            mainText: constants.TITLE, //isBirthday ? sessionAttributes['age'] : handlerInput.t('DAYS_LEFT_MSG', {name: '', count: sessionAttributes['daysLeft']}),
                            hintString: constants.HINT, //handlerInput.t('LAUNCH_HINT_MSG'),
                            backgroundImage:  util.getS3PreSignedUrl('Media/background.jpg'), //: util.getS3PreSignedUrl('Media/papers_'+resolution+'.png'),
                            backgroundOpacity: "0.5" //isBirthday ? "1" : "0.5"
                        },
                        transformers: [{
                            inputPath: 'hintString',
                            transformer: 'textToHint',
                        }]
                    }
                }
            });
        }

        return handlerInput.responseBuilder
            .speak('<say-as interpret-as="interjection">wórales</say-as> '+ speakOutput)
            .reprompt('<say-as interpret-as="interjection">wórales</say-as> '+ speakOutput)
            .withSimpleCard(constants.SKILL_NAME, speakOutput)
            .getResponse();
    }
};

const PoesiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PoesiaIntent';
    },
    handle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;
        var nombre = request.intent.slots.nombre.value;

        let poema=logic.getPoesia(nombre);
        const speakOutput =  poema;

        if (util.supportsAPL(handlerInput)) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: constants.APL.poemaDoc,
                datasources: {
                    longTextTemplateData: {
                        type: 'object',
                        properties: {
                            title:  constants.SKILL_NAME, 
                            text: poema,
                            backgroundImage:  util.getS3PreSignedUrl('Media/background.jpg'), 
                        }
                    }
                }
            });
        }



        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard(constants.POEMA_TITLE, speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = constants.HELP_MESSAGE;

        if (util.supportsAPL(handlerInput)) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: constants.APL.poemaDoc,
                datasources: {
                    longTextTemplateData: {
                        type: 'object',
                        properties: {
                            title:  constants.SKILL_NAME, 
                            text: speakOutput,
                            backgroundImage:  util.getS3PreSignedUrl('Media/background.jpg'), 
                        }
                    }
                }
            });
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard(constants.SKILL_NAME, speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = constants.STOP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = constants.FALLBACK +constants.HELP_MESSAGE;


    if (util.supportsAPL(handlerInput)) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: constants.APL.poemaDoc,
                datasources: {
                    longTextTemplateData: {
                        type: 'object',
                        properties: {
                            title:  constants.SKILL_NAME, 
                            text: speakOutput,
                            backgroundImage:  util.getS3PreSignedUrl('Media/background.jpg'), 
                        }
                    }
                }
            });
        }



        return handlerInput.responseBuilder
            .speak('<say-as interpret-as="interjection">neeel</say-as>. '+ speakOutput)
            .reprompt('<say-as interpret-as="interjection">neeel</say-as>. '+speakOutput)
            .withSimpleCard(constants.SKILL_NAME, speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Sesion Finalizada: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = constants.ERROR;
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        if (util.supportsAPL(handlerInput)) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: constants.APL.poemaDoc,
                datasources: {
                    longTextTemplateData: {
                        type: 'object',
                        properties: {
                            title:  constants.SKILL_NAME, 
                            text: speakOutput,
                            backgroundImage:  util.getS3PreSignedUrl('Media/background.jpg'), 
                        }
                    }
                }
            });
        }

        return handlerInput.responseBuilder
            .speak('<say-as interpret-as="interjection">nooo</say-as><say-as interpret-as="interjection">puff</say-as> <say-as interpret-as="interjection">pues ni modo</say-as> '+speakOutput)
            .reprompt('<say-as interpret-as="interjection">nooo</say-as><say-as interpret-as="interjection">puff</say-as> <say-as interpret-as="interjection">pues ni modo</say-as> '+speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PoesiaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent()
    .lambda();