
const fs = require('fs');
const { loadCrawler, getRelatedSearches, getProducts } = require('./crawler');

(async () => {
    try {
        await loadCrawler();
        const related = getRelatedSearches();
        const products = getProducts();

        console.log(related);

        fs.writeFileSync('products.json', JSON.stringify(products));
        fs.writeFileSync('related.json', JSON.stringify(related));
    } 
    catch(err) {
        console.log(err);
    }
})();