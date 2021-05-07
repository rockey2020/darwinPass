class BrowserApi {
  static async getCurrentTab() {
    if (chrome.tabs) {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
    return { url: location.href };
  }
}

export default BrowserApi;
