// Optional browser check: requires Playwright and a local Chromium installation.
// Run from the repository root: node tests/portfolio.test.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = { '/': 'index.html', '/styles.css': 'styles.css', '/script.js': 'script.js' }[req.url];
  if (!file) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', { 'index.html': 'text/html', 'styles.css': 'text/css', 'script.js': 'text/javascript' }[file]);
  res.end(fs.readFileSync(path.join(root, file)));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(url);
    assert.equal(await page.locator('.announcement').textContent(), 'Portfolio Demo — Not a Real Business');
    for (const width of [320, 390, 760, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}`);
    }
    await page.setViewportSize({ width: 390, height: 850 });
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'FAQ', exact: true }).click();
    assert.equal(await page.locator('#navigation').isVisible(), false);
    await page.locator('#faq summary').first().click();
    assert.equal(await page.locator('#faq details').first().getAttribute('open'), '');
    await page.locator('.hero-copy').getByRole('link', { name: 'Try the Demo Form' }).click();
    assert.equal(new URL(page.url()).hash, '#contact-form');
    const requests = []; page.on('request', req => requests.push(req.url()));
    const button = page.getByRole('button', { name: 'Check demo entries' });
    await button.click(); assert.equal(await page.locator('#name').evaluate(e => e.validity.valid), false);
    await page.locator('#name').fill('   '); await page.locator('#email').fill('bad-email');
    await page.locator('#service').selectOption({ label: 'Snow removal' });
    await page.locator('#message').fill('Sample message for this portfolio.');
    await button.click(); assert.equal(await page.locator('#name').evaluate(e => e.validity.valid), false);
    await page.locator('#name').fill('Sample Visitor'); await button.click();
    assert.equal(await page.locator('#email').evaluate(e => e.validity.valid), false);
    await page.locator('#email').fill('sample@example.com'); await page.locator('#message').fill('short');
    await button.click(); assert.equal(await page.locator('#message').evaluate(e => e.validity.valid), false);
    await page.locator('#message').fill('Sample message for this portfolio.'); await button.click();
    assert.match(await page.locator('#form-status').textContent(), /Nothing was sent or saved/);
    await page.locator('#email').press('Enter');
    await page.evaluate(() => document.querySelector('#contact-form').requestSubmit());
    assert.deepEqual(requests, []); assert.deepEqual(errors, []);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 850 } });
    await nojs.goto(url); assert(await nojs.locator('#navigation').isVisible());
    for (const selector of ['#name', '#email', '#service', '#message', '#contact-form button']) assert(await nojs.locator(selector).isDisabled());
    await nojs.locator('#faq summary').first().click(); assert.equal(await nojs.locator('#faq details').first().getAttribute('open'), '');
    console.log('PASS: six responsive widths, notice, mobile menu, FAQ, demo links, required/email/length/whitespace validation, no submission requests or browser storage, Enter/requestSubmit prevention, no-JavaScript disabled form and navigation, no JS errors.');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
