//Get discord.js

// FOR ANYONE READING THIS DON'T JUDGE ME FOR HAVING UGLY CODE I'M LAZY

const Discord = require('discord.js');

//Create client instance as bot
const botRem = new Discord.Client();
let chanting = false;
let chants = 0;

const data = require('fs'); //importing file save
var dPath = '\data.json';
var dRead = data.readFileSync(dPath);
var dFile = JSON.parse(dRead); //ready for use

//Set listener on 'ready'
botRem.on('ready', () => {
  console.log('DEDEMONETIZER ACTIVATED');
});

//Set listener on 'message'
botRem.on('message', message => {
    id = message.author.id
    if (message.content.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=''\-_`~()]/g, "").replace(/\s+/g, "").includes("helpivebeendemonetized") && !chanting) {
        message.reply('QUICK CHANT "ถึงยังไงเรมก็รักสุบารุค่ะ" THREE TIMES FOR HADES TO TURN YOU BACK INTO A HUMAN');
        chants = 0;
        chanting = false;
        UserFunction(id, 0, 0, true, 0);
        setTimeout(checkChant.bind(null, id, message), 3000);
    }
    if (!dFile[id] && message.content == "ถึงยังไงเรมก็รักสุบารุค่ะ") {
        UserFunction(id, 0, 0, true, 1);
        message.reply("*AAAA*");
    }
    else if (!dFile[id]) {
        
    }
    else if (dFile[id].chanting && message.content == "ถึงยังไงเรมก็รักสุบารุค่ะ") {
        UserFunction(id, 0, 0, null, 1);
        message.reply("*AAAA*");
        if (dFile[id].chants >= 3) {
            DEDEMONETIZE(message, id);
        }
    }

    if (message.content === ";stats" || message.content === ";profile") {
        prof = "\n" + "dedemonetizations: *" + dFile[id].dedemonetizations + "*\n" + "failed dedemonetizations: *" + dFile[id].fails + "*";
        message.reply(prof);
    }
});

function UserFunction(userId, failed = 0, ddmon = 0, chant, chantsVar = 0) {
     //user id here
    if (!dFile[userId]) { //this checks if data for the user has already been created
        dFile[userId] = { dedemonetizations: 0, fails: 0, chanting: chant, chants: chantsVar}; //if not, create it
        data.writeFileSync(dPath, JSON.stringify(dFile, null, 2));
    }
    else {
        var dedemonetizationV = Number(dFile[userId].dedemonetizations) + ddmon; 
        var failV = Number(dFile[userId].fails) + failed;
        var chantsV = Number(dFile[userId].chants) + chantsVar;
        if (chant == null) {
            chant = dFile[userId].chanting;
        }
        dFile[userId] = { dedemonetizations: dedemonetizationV, fails: failV, chanting: chant, chants: chantsV};
        data.writeFileSync(dPath, JSON.stringify(dFile, null, 2));

    }
}

function checkChant(id, message) {
    if (dFile[id].chanting) {
        FAIL(id, message);
    }
}

function FAIL(id, message) {
    message.reply("You were too slow while chanting to Hades and he ignored your request.")
    UserFunction(id, 1, 0, false, -dFile[id].chants);
}

function DEDEMONETIZE(message, id) {
    message.reply("Hades heard your chant and turned you back into a human.")
    UserFunction(id, 0, 1, false, -dFile[id].chants);
}
"hello /*hey*/"
botRem.login('ODk5ODgyMDY4Mzc5NTc0MzAz.YW5OfA._7Dqs4sF1lDDUNQwbaBUYx0nQr8');
//ถึงยังไงเรมก็รักสุบารุค่ะ
//https://discordapp.com/oauth2/authorize?&client_id=<9aa1265fe9b2502135c7daa671ed2f1d23e6a7bfa4c23179384577145f62ff47>&scope=bot&permissions=0