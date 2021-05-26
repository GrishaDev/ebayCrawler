
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const SERP_URL = 'https://www.ebay.com/sch/i.html?_nkw=';
const searchTerm = 'smart+phones';

(async() => {
    const res = await axios.get(SERP_URL+searchTerm);
    const $ = cheerio.load(res.data);
    let related = $('.srp-related-searches').children().last().children().map((i, card) => {
        return $(card).first().text()
    }).get();

    
    // srp-results srp-list clearfix"
    const products = $('.srp-results.clearfix').find('.s-item').map((i, product) => {

        const imageUrl = $(product).find('.s-item__image-img').attr('src')
        // const title = $(product).first().last().find('a').text();
        const title = $(product).find('.s-item__title').text();
        const price = $(product).find('.s-item__price').text();
        const shipping = $(product).find('.s-item__shipping').text();
        const shipsFrom = $(product).find('.s-item__location').text();
        const sponsored = $(product).find('.s-item__sep').first().text();
        console.log(sponsored);

        // $(product).find('.s-item__sep').first().find('span').map((i, thing) => console.log($(thing).attr('class')) ).get();
        
        // const isSponsored = sponsored.length > 0 ? true : false;
        const shippingCountry = shipsFrom.replace('from ', '');
        
        return {
            id: '234234234',
            position: i,
            title,
            price,
            shipping,
            shippingCountry,
            // isSponsored,
            imageUrl
        }
    }).get();

    console.log(products);

    fs.writeFileSync('products.json', JSON.stringify(products));
    console.log(related);
})();