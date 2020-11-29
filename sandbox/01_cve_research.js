const puppeteer = require('puppeteer');

const research = async (cve_id) => {
  // CVEページにアクセスする
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://access.redhat.com/security/cve/' + cve_id);

  // プルダウンメニューを操作して表示件数を100（最大）にする
  await page.select('select[name="DataTables_Table_0_length"]', '100');
  
  // テーブルの"Platform"をクリックし、データを昇順にソートする
  await page.click('th[id="th-platform-b"]')

  // テーブルのデータ一覧を取得する
  const dataList = await page.evaluate(() => {
    const dataList = [];
    const nodeList = document.querySelectorAll("#DataTables_Table_0 tbody tr");
    nodeList.forEach(_node => {
      const product = _node.querySelector("th").innerText;
      const package = _node.querySelector("td:nth-child(2)").innerText;
      const state = _node.querySelector("td:nth-child(3)").innerText;
      const errata = _node.querySelector("td:nth-child(4)").innerText;
      const release_date = _node.querySelector("td:nth-child(5) > pfe-datetime").getAttribute("datetime");
      dataList.push(product + ", " + package + ", " + state + ", " + errata + ", " + release_date);
    })
    return dataList;
  });

  // フィルタリング処理。指定した"Platform"以外のデータを削除する
  const filteredList = dataList.filter((data) => {
    return data.match(/Red Hat Enterprise Linux 7/)
  });
  
  // 返り値の形に合わせてデータを整形する
  const collection = filteredList.map((data) => {
    array = data.split(", ");
    return {
      "Platform": array[0],
      "Package": array[1],
      "State": array[2],
      "Errata": array[3],
      "ReleaseDate": array[4],
    } 
  });
  browser.close();
  return collection;
};

exports.research = research;