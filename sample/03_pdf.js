const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://access.redhat.com/security/cve/CVE-2018-20060');
  await page.pdf({path: 'hn.pdf', format: 'A4'})
  
  await browser.close();
})();