// Get the location URL from the currently selected tab
async function startup() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Get settings from chrome.storage
        const result = await chrome.storage.sync.get({
            autoclose: "yes",
            secsclose: "1500"
        });

        const autoclose = result.autoclose;
        const tsecs = parseInt(result.secsclose);

        if (autoclose === "yes") {
            setTimeout(() => window.close(), tsecs);
        }

        await clipHost(tab.url);
    } catch (error) {
        console.error('Error in startup:', error);
        document.getElementById("results").innerText = 'Error: ' + error.message;
    }
}

// Clips the hostname from input 'u' and updates popup
async function clipHost(u) {
    let tmphost = '';
    if (u.indexOf("http") === 0) {
        tmphost = u.replace(/^https?:\/\//, '');
        const slashidx = tmphost.indexOf("/");
        if (slashidx > 0) {
            tmphost = tmphost.substring(0, slashidx);
        }
    }

    const urlid = document.getElementById("urlid");
    const urlid2 = document.getElementById("urlid2");

    if (tmphost && (tmphost.indexOf(":") === -1)) {
        try {
            // Use modern Clipboard API
            await navigator.clipboard.writeText(tmphost);
            document.getElementById("results").innerText = 'copied to clipboard.';
            urlid2.value = tmphost;
        } catch (error) {
            console.error('Failed to copy:', error);
            document.getElementById("results").innerText = 'Failed to copy to clipboard.';
            urlid2.style.display = "none";
        }
    } else {
        document.getElementById("results").innerText = 'Cannot copy location. Clipboard unchanged.';
        urlid2.style.display = "none";
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for urlid2 to select all text
    const urlid2 = document.getElementById("urlid2");
    urlid2.addEventListener('click', function() {
        this.select();
    });

    startup();
});
