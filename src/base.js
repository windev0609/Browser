export default class FeverDreamBase {
  constructor(options) {
    this.options = options;
  }

  end = async () => {
    // Works for Selenium driven clients.
    await this.driver.quit();

    // Do this after so the connection breaks.
    await this.server.close();
  };

  evaluateInBackground = async asyncFunction => (
    this.server.send(asyncFunction.toString(), { channel: 'evaluateInBackground' })
  );
}
