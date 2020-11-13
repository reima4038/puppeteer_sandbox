const puppeteer = require('puppeteer');

const research = async (rhsa_id) => {

  // CVEページにアクセスする
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://access.redhat.com/errata/' + rhsa_id);

  const dataList = await page.evaluate(() => {
    const dataList = [];
    const distributions = packages.querySelectorAll("#packages > h2");
    let linux7_index = -1;
    const DISTRIBUTIION_LINUX7 = "Red Hat Enterprise Linux Server 7";

    distributions.forEach((d, i) => {
      if(d.innerHTML.match(DISTRIBUTIION_LINUX7)) {
        linux7_index = i;
      }
    })
    if (linux7_index != -1) {
      const index_init = 3;
      const index = index_init + linux7_index;
      const files = document.querySelectorAll("#packages > table:nth-child(" + index + ") > tbody > tr > td.name");
      files.forEach(f => {
        const file = f.textContent
          .replace(/\r?\n/g,"")
          .replace(/ /g, "");
        if(!file.match(/\.src\./)){
          dataList.push(file);
        }
      });
    } 
    return dataList;
  })
  browser.close();
  return dataList;
};

exports.research = research;
