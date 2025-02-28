import fs from 'fs';
import path from 'path';

function replaceEnvs() {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Get config file path from ENV, default to `config.json`
    const configPath = path.resolve(__dirname, `../config/${process.env.VITE_SITE}/prebuild.json`);
    console.log('dirname', __dirname);

    // Load config file dynamically
    if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    const templatePath = path.resolve(__dirname, "../index.template.html");
    const indexPath = path.resolve(__dirname, "../index.html");

    // Read index.html
    let html = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders in index.html
    Object.keys(config).forEach((key) => {
    html = html.replace(new RegExp(`%${key}%`, "g"), config[key]);
    });

    // Write updated content back to index.html
    fs.writeFileSync(indexPath, html);

    console.log(`✅ Config from ${configPath} injected into index.html!`);

    const cnamePath = path.resolve(__dirname, "../public/CNAME");
    fs.writeFileSync(cnamePath, config.SITE_URL);
    console.log(`✅ Cname set to ${config.SITE_URL}!`);
}

export default replaceEnvs;