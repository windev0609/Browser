import Client from '../connections/client';


const findPort = async () => (new Promise((resolve) => {
  const extractPort = (tabId, changeInfo, tab) => {
    const url = tab ? tab.url : tabId;
    const match = /feverDreamPort=(\d+)/.exec(url);
    if (match && match.length > 1) {
      const port = match[1];
      resolve(port);
      browser.tabs.onUpdated.removeListener(extractPort);
    }
  };
  browser.tabs.onUpdated.addListener(extractPort);
  browser.tabs.getCurrent().then(extractPort);
}));


(async () => {
  const port = await findPort();
  const client = new Client();
  await client.connect(port);

  // eslint-disable-next-line no-eval
  client.subscribe(async code => eval(`(${code})()`), { channel: 'evaluateInBackground' });
})();
