const assert = require("assert");
const cve = require("../sandbox/01_cve_research")

describe("cveレポートの取得", function () {
  this.timeout(60000);
  it("正常系：CVE-2018-20060", (done) => {
    // given
    const cve_id = "CVE-2018-20060";
    // when
    cve.research(cve_id)
      .then(actual => {
        // then
        const expected = [
          { Platform: 'Red Hat Enterprise Linux 7',
            Package: 'python-virtualenv',
            State: 'Fixed',
            Errata: 'RHSA-2020:0851',
            ReleaseDate: '2020-03-17T16:38:31+00:00' },
          { Platform: 'Red Hat Enterprise Linux 7',
            Package: 'python-virtualenv',
            State: 'Fixed',
            Errata: 'RHSA-2020:2081',
            ReleaseDate: '2020-05-12T18:58:38+00:00' },
          { Platform: 'Red Hat Enterprise Linux 7',
            Package: 'python-urllib3',
            State: 'Fixed',
            Errata: 'RHSA-2019:2272',
            ReleaseDate: '2019-08-06T13:26:10+00:00' },
          { Platform: 'Red Hat Enterprise Linux 7',
            Package: 'python-pip',
            State: 'Fixed',
            Errata: 'RHSA-2020:0850',
            ReleaseDate: '2020-03-17T16:37:46+00:00' },
          { Platform: 'Red Hat Enterprise Linux 7',
            Package: 'python-pip',
            State: 'Fixed',
            Errata: 'RHSA-2020:2068',
            ReleaseDate: '2020-05-12T18:59:30+00:00' } 
        ] 
        assert.deepStrictEqual(actual, expected);
      }).then(done, done);
  });
});
