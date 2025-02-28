import gifs from './gif-config.js';

const config = {
    baseDir: 'friends',
    siteTitle: 'The Daily Friends',
    localStoragePrefix: 'dailyFriends',
    successPhrases: [
        "Pivot!", "How you doin’?", "I KNOW!", "Could I BE any more excited?", "Unagi",
        "Stop the Madness!", "That is brand new information!", "Oh. My. God.", "I knew it!",
        "Yeah, baby!",
        ],
    characterImages: {
        phoebe: {
            filename: 'phoebe.png',
            name: 'Phoebe',
        },
        chandler: {
            filename: 'chandler.png',
            name: 'Chandler',
        },
        rachel: {
            filename: 'rachel.png',
            name: 'Rachel',
        },
        ross: {
            filename: 'ross.png',
            name: 'Ross',
        },
        monica: {
            filename: 'monica.png',
            name: 'Monica',
        },
        joey: {
            filename: 'joey.png',
            name: 'Joey',
        },
    },
    shareText: 'TheDailyFriends.com',
    comeBackImage: {
        filename: 'tomorrow.gif',
        altText: "I'll see you tomorrow",
    },
    gifs,
};

export default config;