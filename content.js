function clickButtons() {
    // First, click the "تسجيل" button
    var firstButton = document.querySelector('a[href="#finish"]');
    if (firstButton) {
        firstButton.click();
        
        // Wait a little and click the popup button
        setTimeout(() => {
            var popupButton = document.querySelector('.swal2-confirm.swal2-styled');
            if (popupButton) {
                popupButton.click();
            }
        }, 2000); // Adjust this delay as needed
    }
}

// Immediately run the function if content script is injected
clickButtons();
