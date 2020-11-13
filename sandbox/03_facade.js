const cve = require('./01_cve_research');
const rhsa = require('./02_rhsa_research');

const files = async (c) => {
  return Object.assign(c, {"Files" : await rhsa.research(c.Errata)})
};

const cve_research = (id) => {
  return cve.research(id)
            .then(val => {
              return Promise.all(val.map(v => files(v)))
            });
}

const cve_ids = ["CVE-2018-20060"];
Promise.all(cve_ids.map(id => cve_research(id)))
        .then(val => val.flat())
        .then(val => console.log(val));
