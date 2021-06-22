function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        color: document.querySelector("#color").value
    });
  }
  
  
  function restoreOptions() {
  
    function setCurrentChoice(result) {
        color: document.querySelector("#color").value
    }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    let getting = browser.storage.sync.get("color");
        getting.then(setCurrentChoice, onError);
  }
  
  //new
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  function onGot(item) {
    let color = browser.storage.sync.get("color");
    if (item.color) {
      color = item.color;
    }

    document.querySelector("#color").value = color
  }

  let getting = browser.storage.sync.get("color");
  getting.then(onGot, onError);
  //end of new

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  