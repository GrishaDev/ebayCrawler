const cheerio = require('cheerio');
const axios = require('axios');
const config = require('../config');

const { elements } = config;

let $;

const loadCrawler = async () => {
    const res = await axios.get(config.crawlUrl + config.searchTerm, {headers: config.specialHeaders}).catch(err => { throw Error('Failed requesting page') });
    $ = cheerio.load(res.data);
    console.log('crawler loaded succesfuly');
}

const getRelatedSearches = () => {
    return $(elements.relatedSearches).children().last().children().map((i, related) => {
        return $(related).first().text()
    }).get();
}

const getProducts = () => {
    return $(elements.productResults).find(elements.productItem).map((i, product) => {
        const parsedProduct = $(product);
        const imageUrl = findAndGetAttribute(parsedProduct, elements.productImage, 'src');
        const title = findAndGetText(parsedProduct, elements.productTitle);
        const price = findAndGetText(parsedProduct, elements.productPrice);
        const url = $(product).find('a').attr('href');
        const id = getIdFromUrl(url);
        const shippingPrice = findAndGetText(parsedProduct, elements.productShipping);
        const shipsFrom = findAndGetText(parsedProduct, elements.productLocation);
        const symbolsArr = getSymbols(parsedProduct, elements.productSymbols);
        const sponsored = isSponsored(symbolsArr);
        const shippingCountry = shipsFrom.replace('from ', '');
        return {
            id,
            position: i,
            title,
            price,
            shippingPrice,
            shippingCountry,
            sponsored,
            imageUrl
        }
    }).get();
}

const getIdFromUrl = url => {
    return url.substring(
        url.lastIndexOf("/") + 1,
        url.lastIndexOf("?")
    );
}

const getSymbols = (domElement, className) => domElement.find(className).first().find('span').children().toArray();
const isSponsored = symbolsArr => !(symbolsArr.every(symbol => $(symbol).attr('class') === $(symbolsArr[0]).attr('class')));

const findAndGetText = (domElement, className) => $(domElement).find(className).text();
const findAndGetAttribute = (domElement, className, attribute) => $(domElement).find(className).attr(attribute);

module.exports = {loadCrawler, getRelatedSearches, getProducts}