import fs from 'fs';
import path from 'path';
import config from '../config/index.js';

function generateGifConfig() {

    const gifsFolderPath = path.join(path.dirname(new URL(import.meta.url).pathname), `../public/${config.baseDir}/gifs`);
    const gifConfig = {};

    fs.readdir(gifsFolderPath, async (err, files) => {
        if (err) {
            console.error('Error reading GIFs folder:', err);
            return;
        }

        for (const file of files) {
            if (file.endsWith('.gif')) {
                const filePath = path.join(gifsFolderPath, file);
                const fileNumber = parseInt(file.split('.')[0], 10); // Extract the number from the filename

                if (!gifConfig[fileNumber]) {
                    gifConfig[fileNumber] = []; // Initialize the array if it doesn't exist
                }

                gifConfig[fileNumber].push({
                    name: file.replace('.gif', ''),
                });
            }
        }

        const configContent = `const gifs = ${JSON.stringify(gifConfig, null, 2)};\n\nexport default gifs;`;
        fs.writeFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), `../config/${config.baseDir}/gif-config.js`), configContent);
        console.log('gifs.js has been created in the config directory.');
    });
}

export default generateGifConfig;