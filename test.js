

const wdio = require("webdriverio");

const opts = {
    port: 4723,
    capabilities: {
        reportDirectory: 'reports',
                reportFormat: 'xml',
                testName: 'Untitled',
                udid: '316341646e84ea78af1a7a06eaa542018c634af3',
                platformName: 'ios'
    }
  };
  
  async function main () {
    const client = await wdio.remote(opts);
   
    await client.execute('seetest:client.launch(\"com.clarksons.cchat\", \"false\",\"true\")');
    browser.waitUntil(() => {
        client.elementClick("xpath=//*[@text='RL01']")
      }, 5000, 'expected text to be different after 5s');
  
  
     
  }
  
  main();

