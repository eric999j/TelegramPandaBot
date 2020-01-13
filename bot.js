require('dotenv').config();
const Telegraf = require('telegraf');
const axios = require('axios');
const fs = require('fs');

const bot = new Telegraf(process.env.TOKEN);

const coinCommand = require('./src/commands/coin');
coinCommand(bot);

const excelCommand = require('./src/commands/excel');
excelCommand(bot);

const fortuneCommand = require('./src/commands/fortune');
fortuneCommand(bot);

const config = require('./config')

function helpMsg(ctx){
    bot.telegram.sendMessage(ctx.from.id, config.helpMessage,{
        parse_mode: "markdown"
    })
}

// /start
bot.start((ctx)=>{
    ctx.reply("Hi there!");
    helpMsg(ctx);
})

// /help
bot.help((ctx)=>{
    helpMsg(ctx);
})

bot.on('inline_query', async ctx =>{
    let query = ctx.inlineQuery.query;
    let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit = 50`);
    let data = res.data;
    let titles = data[1];
    let links = data[3];
    if(titles == undefined){
        return;
    }
    let results = titles.map((item, index) => {
        return {
           type: 'article',
           id: String(index),
           title: item,
           input_message_content:{
               message_text: `${item}\n${links[index]}`
           },
           description: links[index],
           reply_markup: {
            inline_keyboard: [
                [
                  {text: `Share ${item}`, switch_inline_query:`${item}`}
                ]
            ]
           } 
        }
    }) 
    ctx.answerInlineQuery(results);
})

// cat
bot.hears("cat",(ctx)=>{
    ctx.reply("Meow");
}) 

bot.hears('Credits', ctx => {
    ctx.reply("This bot was made by @name");
})
bot.hears('API', ctx => {
    ctx.reply("This bot uses cryptocompare API");
})
bot.hears("Remove Keyboard", ctx => {
    bot.sendMessage(ctx.chat.id,"Remove Keyboard",
    {
        reply_markup:{
           remove_keyboard: true
        }
    })
})

// type event
bot.use((ctx,next)=>{
    if(ctx.updateSubTypes[0] == 'text'){
        console.log(ctx.from.username + " said " + ctx.message.text);
    }else{
        console.log(ctx.from.username + " sent " + ctx.updateSubTypes[0]);      
    }
    next();
  })

// /echo /echo<msg>
bot.command(["echo","Echo"],(ctx)=>{
    console.log(ctx);
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";
    if(inputArray.length == 1){
      message = "You said echo"
    }else{
      inputArray.shift();// remove "/echo"
      message = inputArray.join(" ");// join all messages and separated by spaces
    }
    ctx.reply(message);
})

// /creator
bot.command(["creator","Creator"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_photo");
    bot.telegram.sendPhoto(ctx.chat.id,
        {
            source: "res/lunski.png"
        },
        {
            reply_to_message_id: ctx.message.message_id
        });
    bot.telegram.sendMessage(ctx.chat.id, `Know more about me`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "My github pages", url: 'http://eric999j.github.io'}
                    ]   
                ]
            }
        })
})

// /panda
bot.command(["panda","Panda"],(ctx)=>{
    bot.telegram.sendPhoto(ctx.chat.id, "https://github.com/eric999j/Clutter/blob/master/pics/YuanZai.jpg");
})

// /pandaAnimate
bot.command(["pandaAnimate","PandaAnimate"],(ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id,"upload_video");
    bot.telegram.sendAnimation(ctx.chat.id,
        "https://media.giphy.com/media/YrJp9LFIDkwms/giphy.gif",
        {
            reply_to_message_id: ctx.message.message_id
        });
})

// pandas
bot.command(["pandas","Pandas"],(ctx)=>{
    let pandas = ["res/0.jpg", "res/1.jpeg", "res/2.jpg", "res/3.jpg"];

    let result = pandas.map(panda => {
        return {
            type:'photo',
            media:{
                source: panda
            }
        }
    })
    bot.telegram.sendMediaGroup(ctx.chat.id,result);
})

// /cat /cat<msg>
bot.command(["cat","Cat"], async (ctx)=>{
   let input = ctx.message.text;
   let inputArray = input.split(" ");

   if(inputArray.length == 1){
       try{
        let res = await axios.get('https://aws.random.cat/meow')
        ctx.reply(res.data.file);
       }catch(e){
        console.log(e); 
       }
    } else {
        inputArray.shift();
        input = inputArray.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
})

// /dogbreeds
bot.command(["dogbreeds","Dogbreeds"],(ctx)=>{
    let rawdata = fs.readFileSync("./dogbreeds.json", "utf8");
    let data = JSON.parse(rawdata);

    let message = "Dog Breeds:\n";
    data.forEach(item => {
        message += `-${item}\n`;
    })
    ctx.reply(message);
})
// /dogsuggestions <msg>
bot.command(["dogsuggestions","Dogsuggestions"],(ctx)=>{
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Need Breed");
        return;
    }
    let breedInput = input[1];

    let rawdata = fs.readFileSync("./dogbreeds.json", "utf8");
    let data = JSON.parse(rawdata);

    let suggestions = data.filter(item =>{
        return item.startsWith(breedInput);
    })

    let message = `Did you mean:\n`;
    suggestions.forEach(item => {
        message += `-${item}\n`;
    })
    if(suggestions.length != 0){
        ctx.reply(message);
    }else{
        ctx.reply("Can't find breed.");
    }  
})


// /dog<breed>
/*
bot.command(["dog","Dog"], (ctx)=>{
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Need Breed");
        return;
    }
    let breedInput = input[1];
    let rawdata = fs.readFileSync("./dogbreeds.json", "utf8");
    let data = JSON.parse(rawdata);

    if(data.includes(breedsInput){
        let url = "https://dog.ceo/api/breed/"+breedInput+"/images/random";
        axios.get(url).then(res => {
            ctx.reply(res.data);
        }).catch(e => {
           console.log(e);
        })
    }
})    
*/

bot.launch();