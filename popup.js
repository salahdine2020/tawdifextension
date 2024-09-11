let autoClickInterval = null;

document.getElementById("startButton").addEventListener("click", () => {
    const timeoutInput = document.getElementById("timeout").value;

    // Convert timeout input to milliseconds
    const timeout = parseInt(timeoutInput) * 60000;

    if (!timeout || timeout <= 0) {
        alert("Please enter a valid timeout in minutes.");
        return;
    }

    // Clear any existing intervals if the button is pressed again
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
    }

    // Start the auto-clicking process at the specified interval
    autoClickInterval = setInterval(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: clickButtons
                });
            }
        });
    }, timeout); // Set the interval based on the user-specified timeout

    alert(`Auto clicking started with an interval of ${timeoutInput} minutes.`);
});

document.getElementById("stopButton").addEventListener("click", () => {
    // Clear the interval if it's running and stop the auto-clicking process
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
        alert("Auto clicking stopped.");
    } else {
        alert("Auto clicking is not running.");
    }
});

// Define the function that will click the buttons (this will run in the context of the active tab)
function clickButtons() {
    console.log("Clicking button...");

    // First, click the "تسجيل" button
    var firstButton = document.querySelector('a[href="#finish"]');
    if (firstButton) {
        console.log("First button found, clicking...");
        firstButton.click();

        // Wait a bit and then click the popup button
        setTimeout(() => {
            var popupButton = document.querySelector('.swal2-confirm.swal2-styled');
            if (popupButton) {
                console.log("Popup button found, clicking...");
                popupButton.click();
            } else {
                console.error("Popup button not found");
            }
        }, 2000);
    } else {
        console.error("First button not found");
    }
}
