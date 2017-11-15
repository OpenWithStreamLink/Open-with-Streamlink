function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    quality: document.getElementById('qualitySelect').value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.getElementById('qualitySelect').value = result.quality || 'best';
  }

  function onError(error) {
    console.log('Error: ${error}');
  }

  var getting = browser.storage.local.get('quality');
  getting.then(setCurrentChoice, onError);
}

document.getElementById('title').textContent=browser.i18n.getMessage('titleOption');
document.getElementById('submit').textContent=browser.i18n.getMessage('buttonSaveOption');
document.getElementById('qualityLabel').textContent=browser.i18n.getMessage('labelQualityOption');
document.getElementById('qualityDetail').textContent=browser.i18n.getMessage('detailQualityOption');

var textQualityArray = browser.i18n.getMessage('listQualityOption').split(',');
var valueQualityArray = browser.i18n.getMessage('valueQualityOption').split(',');
var qualitySelect = document.getElementById('qualitySelect');

textQualityArray.forEach(function(element, index) {
  var option = document.createElement('option');
  option.value = valueQualityArray[index];
  option.text = element;
  qualitySelect.add(option);
});

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
