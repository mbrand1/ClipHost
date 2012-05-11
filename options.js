// Saves options to localStorage.
function save() {
  var autoclose = document.getElementById("autoclose");
  var secsclose_select = document.getElementById("secsclose");
  var secsclose = secsclose_select.children[secsclose_select.selectedIndex].value;
  
  if (autoclose.checked) {
    localStorage["autoclose"] = 1;
    localStorage["secsclose"] = secsclose;
  } else {
     localStorage["autoclose"] = 0;
  }

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores autoclose state to saved value from localStorage.
function restore() {
  var isAutoClosed = localStorage["autoclose"];
  var autoclose = document.getElementById("autoclose");  
  var secsclose_select = document.getElementById("secsclose");  
  if (isAutoClosed == 1) {
    autoclose.checked = true;
    var secs = localStorage["secsclose"];
    if (secs) {
      for (var i = 0; i < secsclose_select.children.length; i++) {
        var kid = secsclose_select.children[i];
        if (kid.value == secs) {
          kid.selected = "true";
          break;
        }
      }
    }
  } else {
    autoclose.checked = false;
    secsclose_select.disabled = true;
  }
}

// Disable secsclose if autoclose unchecked
function updateSecsDisabled() {
  var secsclose_select = document.getElementById("secsclose");
  var autoclose = document.getElementById("autoclose");
  secsclose_select.disabled = !autoclose.checked;
}