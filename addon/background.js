
nativeName = "streamlinklauncher";

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

function onRemoved() {
  console.log("Item removed successfully");
}

function onResponse(r) {
  console.log("Response: " + r);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onDisconnect(p){
  p0 = p;
}

function onClickedAction(tab)  {
  if(tab.url !== undefined && tab.url !== null){
    console.log(tab.url);
    s = browser.runtime.sendNativeMessage(nativeName, tab.url);
    s.then(onResponse, onError);
  }
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  browser.pageAction.show(tab.id);  
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});


browser.menus.create({
  id: "streamlinklauncher-link",
  title: browser.i18n.getMessage("menuItemLinkStreamlink"),
  contexts: ["link"],
  targetUrlPatterns: ['*://go.twitch.tv/*','*://www.dailymotion.com/video/*','*://livestream.com/accounts/*','*://www.youtube.com/watch?v=*']
}, onCreated);

browser.menus.create({
  id: "streamlinklauncher-page",
  title: browser.i18n.getMessage("menuItemPageStreamlink"),
  contexts: ["page"],
  documentUrlPatterns: ['*://go.twitch.tv/*','*://www.dailymotion.com/video/*','*://livestream.com/accounts/*','*://www.youtube.com/watch?v=*']
}, onCreated);

browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "streamlinklauncher-link":
      url = info.linkUrl;
      break;
    case "streamlinklauncher-page":
      url = info.pageUrl;
      break;
  }
  if(url !== undefined && url !== null){
    console.log(url);
    s = browser.runtime.sendNativeMessage(nativeName, url);
    s.then(onResponse, onError);
  }
});

browser.browserAction.onClicked.addListener(onClickedAction);
browser.pageAction.onClicked.addListener(onClickedAction);
