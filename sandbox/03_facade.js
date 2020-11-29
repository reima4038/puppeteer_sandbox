const cve = require('./01_cve_research');
const rhsa = require('./02_rhsa_research');

const files = async (c) => {
  return Object.assign(c, {"Files" : await rhsa.research(c.Errata)})
};

const cve_research = (id) => {
  return cve.research(id.CVE_ID)
            .then(val => val.map(v => files(v)))
            .then(val => Promise.all(val))
            .then(val => Object.assign(id, { "Data": val }));
}

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

module.exports.facade = (cve_ids) => {
  return Promise.all(cve_ids.map(id => cve_research(id)))
}