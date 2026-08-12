/**
 * Behavioural check for the motion layer: hero word reveal, count-up metrics,
 * scroll-direction nav, and the View-Transition project filter — plus the
 * reduced-motion escape hatch for all of them.
 *
 *   npm run check:motion      (builds, serves dist, drives it, tears down)
 */
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const URL = 'http://localhost:4321/';

const server = spawn('npx', ['astro', 'preview'], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

// Wait for the preview server rather than guessing at a sleep duration.
for (let i = 0; ; i++) {
  try {
    await fetch(URL);
    break;
  } catch {
    if (i > 40) throw new Error('preview server never came up');
    await new Promise((r) => setTimeout(r, 250));
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const failures = [];
const ok = (name, cond, extra = '') => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`);
  if (!cond) failures.push(name);
};

await page.goto(URL, { waitUntil: 'load' });
await page.waitForTimeout(1600);

// --- hero: tagline split into masked words, all settled at translateY(0) ---
const words = await page.$$eval('#home h1 .word > span', (els) =>
  els.map((e) => ({ t: getComputedStyle(e).transform, txt: e.textContent }))
);
ok(
  'hero words split + settled',
  words.length > 1 && words.every((w) => w.t === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(w.t)),
  words.map((w) => w.txt).join('|')
);

// --- about: figures count up to the values authored in the HTML ---
await page.locator('#about h3:has-text("Track Record")').scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
const metrics = await page.$$eval('#about .metric', (els) => els.map((e) => e.textContent.trim()));
const expected = await page.$$eval('#about .metric', (els) => els.map((e) => e.dataset.to));
ok('metrics counted to final', JSON.stringify(metrics) === JSON.stringify(expected), metrics.join(','));

// --- nav: retracts scrolling down past the fold, returns on the way up ---
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollBy(0, 900));
await page.waitForTimeout(500);
ok('nav retracts scrolling down', await page.$eval('header', (h) => h.classList.contains('nav-hidden')));
await page.evaluate(() => window.scrollBy(0, -400));
await page.waitForTimeout(500);
ok('nav returns scrolling up', !(await page.$eval('header', (h) => h.classList.contains('nav-hidden'))));

// --- projects: thumb slides, grid narrows, transition names are cleaned up ---
await page.locator('#projects').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const thumbBefore = await page.$eval('.filter-indicator', (e) => e.style.getPropertyValue('--fx') + '/' + e.style.width);
const visibleBefore = await page.$$eval('.project-card:not(.hidden)', (e) => e.length);
await page.click('.filter-btn[data-category="web"]');
await page.waitForTimeout(900);
const thumbAfter = await page.$eval('.filter-indicator', (e) => e.style.getPropertyValue('--fx') + '/' + e.style.width);
const visibleAfter = await page.$$eval('.project-card:not(.hidden)', (e) => e.length);
ok(
  'thumb armed + slides',
  (await page.$eval('.filter-indicator', (e) => e.classList.contains('ready'))) && thumbBefore !== thumbAfter,
  `${thumbBefore} -> ${thumbAfter}`
);
ok('filter narrowed the grid', visibleAfter > 0 && visibleAfter < visibleBefore, `${visibleBefore} -> ${visibleAfter}`);
ok(
  'view-transition-name cleaned up',
  await page.$$eval('.project-card', (els) => els.every((e) => !e.style.getPropertyValue('view-transition-name')))
);

// --- reduced motion: nothing is ever hidden, figures stay static ---
const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await reduced.emulateMedia({ reducedMotion: 'reduce' });
await reduced.goto(URL, { waitUntil: 'load' });
await reduced.waitForTimeout(700);
const rm = await reduced.evaluate(() => ({
  init: document.querySelectorAll('.reveal-init').length,
  metrics: [...document.querySelectorAll('#about .metric')].map((e) => e.textContent.trim()),
  h1: getComputedStyle(document.querySelector('#home h1')).opacity,
}));
ok('reduced-motion: nothing hidden', rm.init === 0 && rm.h1 === '1');
ok('reduced-motion: metrics static', JSON.stringify(rm.metrics) === JSON.stringify(expected), rm.metrics.join(','));

await browser.close();
stop();
console.log(failures.length ? `\n${failures.length} FAILED` : '\nall checks passed');
process.exit(failures.length ? 1 : 0);
