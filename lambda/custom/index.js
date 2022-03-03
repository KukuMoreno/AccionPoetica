//lambda

const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    
    return handlerInput.responseBuilder
      .speak('¡Hola!... '+HELP_MESSAGE)
      .withSimpleCard(SKILL_NAME)
      .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: require('../main.json'),
                datasources: {}
            })
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const PoesiaHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'PoesiaIntent';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    
    var nombre = request.intent.slots.nombre.value;
    
    console.log('nombre -'+nombre);
    if (typeof nombre === 'undefined') nombre = 'amor';
    
    const data = [
      'Y me preguntas '+nombre+' que es poesía... ¡Poesía eres tu!',
      nombre+' ...eres una persona tan bonita que a todos robas... robas un suspiro. Una mirada... mas que eso. Eres de aquellas personas que... con una sonrisa roban el alma',
      'Tú sonrisa elegante y tu espíritu andante me hacen perder la razón y tu nombre '+nombre+' ahora habita en mi corazón',
      'Eres tu '+nombre+'... eres tu mi tesoro, la persona que adoro... y me hace perder la razón',
      'Debo confesar '+nombre+' que ya te conocía antes de conocerte.... Al soñarte ya te amaba',
      nombre+' ...eres mi estrella... puedo verlo en tu mirada',
    ];
    
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact +  ' <break time="1s"/> <say-as interpret-as="interjection">wuórales</say-as> ¡cuanta inspiración!. Ahora ' + HELP_MESSAGE ;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, speechOutput)
      .reprompt(HELP_REPROMPT)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require('./poesia.json'),
        datasources: { 
          "bodyTemplate7Data": {
            "title": "Poesía Urbana",
            "backgroundImage": {
              "sources":[
                {
                "url":"https://s3.amazonaws.com/poesia-urbana/PoesiaBackground.jpg"
                }
              ]
            }
          }
        }
      })
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Se ha terminado la sesión por las siguientes causas: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('<say-as interpret-as="interjection">épale ocurrió un error</say-as>')
      .reprompt('Lo siento, ocurrió un error')
      .getResponse();
  },
};


const SKILL_NAME = 'Poesia Urbana';
const GET_FACT_MESSAGE = '';
const HELP_MESSAGE = ' Puedes decir: Escribe poesía para alguien... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const STOP_MESSAGE = 'Adios y <say-as interpret-as="interjection">buena suerte</say-as>';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PoesiaHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
.lambda();