const fs = require('fs');
const csv = require('csv');
const facade = require('./03_facade')

const dataSet = (header, row) => {
  const result = {};
  header.forEach((h, i) => {
    result[h] = row[i];
  });
  return result;
}

const parser = csv.parse((error, data) => {
  // input
  const header_row_start = 0;
  const header_row_end = 1;
  const header = data.slice(header_row_start, header_row_end).flat();
  const rows = data.slice(header_row_end, data.length);
  const input_data = rows.map(row => dataSet(header, row));

  // process
  const cve_ids = [
    {
      "Term": "2020-08",
      "Number": "10",
      "CVE_ID": "CVE-2018-20060",
    },
    {
      "Term": "2020-08",
      "Number": "100",
      "CVE_ID": "CVE-2018-20060",
    }
  ];
  facade.facade(cve_ids).then((result) => {
    const output_data = result.map(v => {
      return v.Data.map((record) => {
        return {
          Term: v.Term,
          Number: v.Number,
          CVE_ID: v.CVE_ID,
          ReleaseDate: record.ReleaseDate,
          Errata: record.Errata,
          Package: record.Package,
        }
      });
    });

    // output
    csv.stringify(output_data.flat(), (error, output)=>{
      fs.writeFile('./csv_output/out.csv', output, (error)=>{
          console.log('処理データをCSV出力しました。');
      })
    })
  });
});

fs.createReadStream('./csv_input/data_in_01.csv')
  .pipe(parser);