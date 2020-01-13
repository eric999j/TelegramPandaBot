const axios = require('axios');
const cryptocompareApiKey = process.env.CRYPTO;
module.exports = (bot) =>{
    // /coin
    bot.command(["coin","Coin"],(ctx)=>{
        sendStartMessage(ctx);
    })

function sendStartMessage(ctx){
    let startMessage = `Cryptocurrency info`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Crypto Prices", callback_data: 'price'}
                    ],   
                    [
                        {text: "CoinMarketCap", url: 'http://coinmarketcap.com'}
                    ],
                    [
                        {text: "Bot Info", callback_data: 'info'}
                    ],
                ]
            }
        })
}


//price handler
bot.action('price', ctx =>{
    ctx.deleteMessage();
    let priceMessage = `Cryptocurrency info`;
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Price-BTC", callback_data: 'BTC'},
                    {text: "Price-ETH", callback_data: 'ETH'}
                ],   
                [
                    {text: "Price-BCH", callback_data: 'BCH'},
                    {text: "Price-LTC", callback_data: 'LTC'}
                ],
                [
                    {text: "Back to Menu", callback_data: 'start'},
                ],
            ]
        }
    })
})

let priceActionList =['BTC','ETH','BCH','LTC'];

bot.action(priceActionList, async ctx =>{
    let symbol = ctx.match;
    console.log(symbol);

    try{
        let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD&api_key=${cryptocompareApiKey}`)
        ctx.reply(res.data);
    }catch(err){
        console.log(err);
    }

})

bot.action('start', ctx =>{
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

// /info handler
bot.action(["info"],(ctx)=>{
    ctx.answerCbQuery();
    try{
        bot.telegram.sendMessage(ctx.chat.id, "Bot Info",
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: "Credits", callback_data:""},
                            {text: "API", callback_data:""}
                        ],
                        [
                            {text: "Remove Keyboard"}
                        ]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            })
    }catch(err){
        console.log(err);
    }
})
}
