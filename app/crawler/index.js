const cheerio = require('cheerio');
const axios = require('axios');

const SERP_URL = 'https://www.ebay.com/sch/i.html?_nkw=';
const searchTerm = 'smart+phones';

let $;

const loadPage = () => {
    const res = await axios.get(SERP_URL + searchTerm);
    $ = cheerio.load(res.data);
}

const getRelatedSearches = () => {
    return $('.srp-related-searches').children().last().children().map((i, related) => {
        return $(related).first().text()
    }).get();
}

const getProducts = () => {
    const products = $('.srp-results.clearfix').find('.s-item').map((i, product) => {

        const imageUrl = $(product).find('.s-item__image-img').attr('src')
        const title = $(product).first().last().find('a').text();
        const price = $(product).find('.s-item__price').text();
        const shipping = $(product).find('.s-item__shipping').text();
        const shipsFrom = $(product).find('.s-item__location').text();
        // const sponsored = $(product).find('.s-item__sep').find('s-czibw4');
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
}


const findAndGetText = (domElement, className) => $(domElement).find(className).text();
const findAndGetAttribute = (domElement, attribute) => $(domElement).find(className).attr(attribute);