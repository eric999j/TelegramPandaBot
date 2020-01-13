const axios = require('axios');
const googleSheet = process.env.GOOGLESHEET;

let dataStore = [];
let count = 0;

module.exports = (bot) =>{
/*
// access gooogle sheet
async function getData() {
    try {
        let res = await axios(googleSheet);
        //console.log(res.data.feed.entry);
        let data = res.data.feed.entry;
        dataStore = [];
        data.forEach(item => {
            count +=1;
            dataStore.push({
                val: item.gsx$theaveragepersonwillspendsixmonthsoftheirlifewaitingforredlightstoturngreen,
            })
        })
        console.log(dataStore);
        //console.log(count);
    } catch (err) {
        console.log(err);                          
    }
}

// update fact, google sheet
bot.command(["update","Update"],(ctx)=>{
    try{
        //await getData();
        getData();
        ctx.reply('Updated');
    }catch(err){
        console.log(err);
        ctx.reply('Error');        
    }
})

// /fact
bot.command(["fact","Fact"],(ctx)=>{
    let k = Math.floor(Math.random() * count) + 1;
    ctx.reply(dataStore[k].val.$t);
})
*/
}