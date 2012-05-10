// Get the location URL from the currently selected tab
function startup() {
    chrome.tabs.getSelected(null, function(tab) {
	setTimeout("window.close()", 1500);
        clipHost(tab.url);
    });
    return true;
}

// Clips the hostname from input 'u' and updates popup
function clipHost(u) {
    var tmphost = '';
    if (u.indexOf("http") === 0) {
        tmphost = u.replace(/^https?:\/\//,'');
        slashidx = tmphost.indexOf("/");
        if (slashidx > 0) {
            tmphost = tmphost.substring(0, slashidx);
        }
    }

    // urlid - input field set to hostname where copy action is performed
    // urlid2 - input field set to hostname and displayed to user. if user clicks into urlid2, field
    //          will be selected (useful for unix users to get hostname into Selected clipboard)
    urlid = document.getElementById("urlid");
    urlid2 = document.getElementById("urlid2");

    if (tmphost && (tmphost.indexOf(":") == -1)) {
        urlid.style.display = "block";
        urlid.value = tmphost;
        urlid.focus();
        urlid.select();
        document.execCommand("Copy");
        document.getElementById("results").innerText = 'copied to clipboard.';
        urlid2.value = tmphost;
    } else {
        document.getElementById("results").innerText = 'Cannot copy location. Clipboard unchanged.';
        urlid2.style.display = "none";
    }
    urlid.style.display = "none";
}
