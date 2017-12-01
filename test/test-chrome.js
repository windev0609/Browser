import path from 'path';
import chai from 'chai';

// We're using the compiled code, so must register the source maps.
import 'source-map-support/register'
import FeverDream from '../dist';


describe('Chrome Browser', function() {
  this.timeout(5000);
  let chrome;
  before(async () => chrome = await FeverDream());
  after(async () => await chrome.end());

  it('should install and run the extension', async () => {
    const htmlFile = path.resolve(__dirname, 'data', 'blank-page.html');
    await chrome.driver.get(`file://${htmlFile}`);
    const title = await chrome.driver.getTitle();
    chai.expect(title).to.equal('Successfully Installed');
  });

  it('should receive a ping/pong response', async () => {
    const response = await chrome.server.ping();
    chai.expect(response).to.equal('pong');
  });

  it('should execute JavaScript in the background', async () => {
    const userAgent = await chrome.evaluateInBackground(async () => window.navigator.userAgent);
    chai.expect(userAgent).to.be.a('string');
    chai.expect(userAgent).to.have.lengthOf.above(10);
  });
});