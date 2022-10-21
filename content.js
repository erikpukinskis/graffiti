chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if (message === "add-text") {
        addText()
      }
    }
);

function addText() {
  const body = document.querySelector("body");
  if (!body) return
  const input = document.createElement("textarea")
  input.setAttribute("placeholder", "empty")
  input.innerText = "text"

  Object.entries({
    "position": "absolute",
    "top": "100px",
    "left": "100px",
    "font-size": "32px",
    "font-family": "Arial Rounded MT Bold, Arial Rounded, Arial Rounded MT, ui-rounded",
    "font-weight": "bold",
    "color": "#FF00CC",
    "border": "none",
    "border-radius": "2px",
    "background-color": "transparent",
    "width": "300px",
  }).forEach(([key, value]) => input.style[key] = value)
  body.appendChild(input)

  dragElement(input);

  setTimeout(() => input.focus(), 1)
}


// Make the DIV element draggable:

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var didDrag

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    if (document.activeElement === e.target) {
      console.log("focused, ignoring")
      return
    }
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    didDrag = false
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    didDrag = true
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    if (!didDrag) {
      e.target.focus()
      e.target.select()
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}