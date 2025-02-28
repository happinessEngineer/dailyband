import gifs from './gif-config.js';

const config = {
    baseDir: 'beatles',
    siteTitle: 'The Daily Beatles',
    localStoragePrefix: 'dailyBeatles',
    successPhrases: [
        "Correct",
        ],
    shareText: 'daily.band/beatles',
    comeBackImage: {
        filename: 'tomorrow.jpg',
        altText: 'See you tomorrow?',
    },
    gifs,
};

export default config;