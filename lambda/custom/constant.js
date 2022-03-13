module.exports = {
    // we now specify which attributes are saved (see the save interceptor below)
  //  PERSISTENT_ATTRIBUTES_NAMES: ['day', 'month', 'monthName', 'year', 'sessionCounter', 'reminderId','stadium'],
    // these are the permissions needed to fetch the first name
 //   GIVEN_NAME_PERMISSION: ['alexa::profile:given_name:read'],
    // these are the permissions needed to send reminders
 //   REMINDERS_PERMISSION: ['alexa::alerts:reminders:skill:readwrite'],
    // max number of entries to fetch from the external API
  //  MAX_BIRTHDAYS: 5,
     // APL documents
    APL: {
        launchDoc: require('./documents/launchScreen.json'),
        poemaDoc: require('./documents/poema.json')
    },
    ZONA_HORARIA: false,
    POEMA:[
        'Y me preguntas |nombre| que es poesía... ¡Poesía eres tu!',
        '|nombre| ...eres una persona tan bonita que a todos robas... robas un suspiro. Una mirada... mas que eso. Eres de aquellas personas que... con una sonrisa roban el alma',
        'Tú sonrisa elegante y tu espíritu andante me hacen perder la razón y tu nombre |nombre| ahora habita en mi corazón',
        'Eres tu |nombre|... eres tu mi tesoro, la persona que adoro... y me hace perder la razón',
        'Debo confesar |nombre| que ya te conocía antes de conocerte.... Al soñarte ya te amaba',
        '|nombre| ...eres mi estrella... puedo verlo en tu mirada',
    ],
    SKILL_NAME: 'Acción Poetica',
    LAUNCH_MESSAGE:'Bienvenido!  a Acción Poetica.',
    TITLE: 'Bienvenido',
    HINT: 'Dime un poema',
    HELP_MESSAGE: ' Puedes decir: Escribe poesía para alguien... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?',
    HELP_REPROMPT: '¿Cómo te puedo ayudar?',
    STOP_MESSAGE: 'Adios y <say-as interpret-as="interjection">buena suerte</say-as>',
    POEMA_TITLE:'Poema',
    FALLBACK:'Esa opción no existe',
    ERROR:'. Ha ocurrido un error, intente de nuevo.'
}