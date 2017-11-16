nativeName = 'openwithstreamlink';

function onCreated() {
  if (browser.runtime.lastError) {
    console.log('Error: ',browser.runtime.lastError);
  } else {
    console.log('Item created successfully');
  }
}

function onRemoved() {
  console.log('Item removed successfully');
}

function onResponse(r) {
  console.log('Response: ' + r);
}

function onError(error) {
  console.log('Error: ',error);
}

function onDisconnect(p){
  p0 = p;
}

function sendUrl(url) {
  function sendMessage(result) {
    var message = Object();
    message.url = url;
    message.quality = result.quality || 'best';
    s = browser.runtime.sendNativeMessage(nativeName, message);
    s.then(onResponse, onError);
  }

  browser.storage.local.get('quality').then(sendMessage, onError);
}

browser.menus.create({
  id: 'openwithstreamlink-link',
  title: browser.i18n.getMessage('menuItemLinkStreamlink'),
  contexts: ['link'],
  targetUrlPatterns: ['*://go.twitch.tv/*','*://www.twitch.tv/*','*://www.dailymotion.com/video/*','*://livestream.com/accounts/*','*://www.youtube.com/watch?v=*']
}, onCreated);

browser.menus.create({
  id: 'openwithstreamlink-page',
  title: browser.i18n.getMessage('menuItemPageStreamlink'),
  contexts: ['page'],
  documentUrlPatterns: ['*://go.twitch.tv/*','*://www.twitch.tv/*','*://www.dailymotion.com/video/*','*://livestream.com/accounts/*','*://www.youtube.com/watch?v=*']
}, onCreated);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'openwithstreamlink-link':
      url = info.linkUrl;
      break;
    case 'openwithstreamlink-page':
      url = info.pageUrl;
      break;
  }
  if(url !== undefined && url !== null){
    sendUrl(url);
  }
});

function onClickedAction(tab)  {
  if(tab.url !== undefined && tab.url !== null){
    sendUrl(tab.url);
  }
}

browser.browserAction.onClicked.addListener(onClickedAction);
