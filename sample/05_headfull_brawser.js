const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://access.redhat.com/security/cve/CVE-2018-20060');

  await browser.close();
})();