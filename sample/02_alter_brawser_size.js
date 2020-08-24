const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width:1024,
    height:768 * 2,
    deviceScaleFactor: 1,
  })
  await page.goto('https://access.redhat.com/security/cve/CVE-2018-20060');
  await page.screenshot({path: 'example.png'});


  await browser.close();
})();