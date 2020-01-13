const axios = require('axios');
module.exports = (bot) =>{
    // /fortune
    bot.command(["fortune","Fortune"],(ctx)=>{
        axios.get('http://yerkee.com/api/fortune')
        .then(res => {
        ctx.reply(res.data.fortune);
        }).catch(e => {
        console.log(e);
        })
    })
}
