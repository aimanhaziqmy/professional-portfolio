import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 5000;
const DIST_DIR = 'dist';

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: DIST_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }]
    });
});

server.listen(PORT, async () => {
    console.log('Server started for pre-rendering...');
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        console.log('Loading page...');

        // We navigate to the local server
        await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('Timeout (expected with Firebase WebSockets):', e.message));

        console.log('Waiting for content to populate...');
        // Wait for dynamic content to be loaded by Firebase
        await new Promise(resolve => setTimeout(resolve, 5000));

        const html = await page.content();

        // Save the pre-rendered HTML back to index.html
        const outPath = path.resolve(DIST_DIR, 'index.html');
        fs.writeFileSync(outPath, html);

        console.log('Pre-rendering successful! Saved to', outPath);
        await browser.close();
    } catch (error) {
        console.error('Pre-rendering failed:', error);
        process.exit(1);
    } finally {
        server.close();
    }
});
