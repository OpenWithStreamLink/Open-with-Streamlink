function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    color: document.querySelector("#color").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "blue";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("color");
  getting.then(setCurrentChoice, onError);
}

document.getElementById('submit').textContent=browser.i18n.getMessage("buttonSaveOption");
document.getElementById('qualityLabel').textContent=browser.i18n.getMessage("labelQualityOption");
document.getElementById('qualityDetail').textContent=browser.i18n.getMessage("detailQualityOption");

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
