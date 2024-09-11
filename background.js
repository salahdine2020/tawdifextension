chrome.runtime.onInstalled.addListener(() => {
    // Start the timer to run every minute (60000 ms)
    setInterval(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: clickButtons
                });
            }
        });
    }, 60000); // 1 minute in milliseconds
});

function clickButtons() {
    // This function is defined in content.js
}
