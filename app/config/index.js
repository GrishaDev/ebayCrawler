module.exports = {
    crawlUrl: 'https://www.ebay.com/sch/i.html?_nkw=',
    searchTerm: 'shirts',
    elements: {
        relatedSearches: '.srp-related-searches',
        productResults: '.srp-results.clearfix',
        productItem: '.s-item',
        productImage: '.s-item__image-img',
        productTitle: '.s-item__title',
        productPrice: '.s-item__price',
        productShipping: '.s-item__shipping',
        productLocation: '.s-item__location',
        productSymbols: '.s-item__sep',
    },
    specialHeaders: {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'},
}