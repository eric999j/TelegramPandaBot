const pixabayApiKey = process.env.PIXABAY;
module.exports = (bot) =>{
// inline query input_message_content
// bot.inlineQuery(/p\s.+/, async ctx =>{
//     let input = ctx.inlineQuery.query.split(' ');
//     input.shift();
//     let query = input.join(' '); 

//     //let query = ctx.inlineQuery.query;
//     let res = await axios.get(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${query}`);
//     let data = res.data.hits;
//     console.log(data);

//     let results = data.map((item,index) => {
//        return {
//            type: 'photo',
//            id: String(index),
//            photo_url: item.webformatURL,
//            thumb_url: item.previewURL,
//            photo_width: 200,
//            photo_heigh: 300,
//            caption: `[Source:](${item.webformatURL})\n [Large:](${item.largeImageURL})`,
//            parse_mode: 'Markdown',
//            input_message_content:{
//             message_text: `${item}\n${links[index]}`
//         },
//        }
//     })
//     ctx.answerInlineQuery(results);
// }) 

// wikipedia
// bot.inlineQuery(/p\w.+/, async ctx =>{
//     let input = ctx.inlineQuery.query.split(' ');
//     input.shift();
//     let query = input.join(' '); 
}