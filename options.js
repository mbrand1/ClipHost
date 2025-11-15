// Saves options to chrome.storage
async function save() {
  const autoclose = document.getElementById("autoclose");
  const secsclose_select = document.getElementById("secsclose");
  const secsclose = secsclose_select.children[secsclose_select.selectedIndex].value;

  await chrome.storage.sync.set({
    autoclose: autoclose.checked ? "yes" : "no",
    secsclose: secsclose
  });

  // Update status to let user know options were saved.
  const status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(() => {
    status.innerHTML = "";
  }, 750);
}

// Restores autoclose state to saved value from chrome.storage
async function restore() {
  const result = await chrome.storage.sync.get({
    autoclose: "yes",
    secsclose: "1500"
  });

  const autoclose = document.getElementById("autoclose");
  const secsclose_select = document.getElementById("secsclose");

  if (result.autoclose === "yes") {
    autoclose.checked = true;
    const secs = result.secsclose;
    for (let i = 0; i < secsclose_select.children.length; i++) {
      const kid = secsclose_select.children[i];
      if (kid.value === secs) {
        kid.selected = "true";
        break;
      }
    }
  } else {
    autoclose.checked = false;
    secsclose_select.disabled = true;
  }
}

// Disable secsclose if autoclose unchecked
function updateSecsDisabled() {
  const secsclose_select = document.getElementById("secsclose");
  const autoclose = document.getElementById("autoclose");
  secsclose_select.disabled = !autoclose.checked;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners
  document.getElementById("saveButton").addEventListener('click', save);
  document.getElementById("autoclose").addEventListener('change', updateSecsDisabled);

  // Restore saved settings
  restore();
});