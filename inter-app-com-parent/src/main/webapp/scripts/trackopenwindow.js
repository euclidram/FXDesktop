(function initializeOpenUniquePopUp() {
  var openedDomain = 'http://opened.dev';
  var trackedWindows = {};
 
  window.openUniquePopUp = function(path, windowName, specs) {
    trackedWindows[windowName] = false;
    var popUp = window.open(null, windowName, specs);
    popUp.postMessage('ping', openedDomain);
    setTimeout(checkIfOpen, 1000);
 
    function checkIfOpen() {
      if(!trackedWindows[windowName])
        window.open(openedDomain + path, windowName, specs);
    }
  };
 
  if(window.addEventListener)
    window.addEventListener('message', onPingBackMessage, false);
  else if (window.attachEvent)
    window.attachEvent('message', onPingBackMessage, false);
  
  function onPingBackMessage(event) {
    if(event.origin == openedDomain) {
      trackedWindows[event.data] = true;
    }
  }
})();