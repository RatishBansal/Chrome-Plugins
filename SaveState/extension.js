let saveState = document.getElementById('saveState');
let restoreState = document.getElementById('restoreState');
let clearAll = document.getElementById('clearAll');
var dynamicSelect = document.getElementById("collectionDropDown");
window.onload = function() {
  populateCollectionFromStorage();
};
saveState.onclick = function(element) {
  saveTabUrls();
};
restoreState.onclick = function(element) {
  restoreTabUrls();
};

clearAll.onclick = function(element) {
  clearAllCollections();
};

/*dynamicSelect.onclick = function(element) {
  populateCollectionFromStorage();
};*/
function restoreTabUrls() {
	e= document.getElementById("collectionDropDown");
	var strUser = e.options[e.selectedIndex].text;
  chrome.storage.sync.get([strUser], function(result) {
          console.log('Value currently is ' + result.value);
		  urls= Object.values(result);
		  chrome.windows.create({url:urls[0]}, function(newWindow) {
			  console.log('Successfuly launched');
			  });
        });
}

function clearAllCollections() {
  chrome.storage.sync.clear(function(result) {
          console.log('Storage cleared');
        });
}

function saveTabUrls() {
  chrome.windows.getCurrent(function(currentWindow) {
    currentWindowId = currentWindow.id;
	loadWindowList(currentWindowId);
  });
}
function loadWindowList(currentWindowId) {
  chrome.windows.get(currentWindowId,{ populate: true }, function(currentWindow) {
	  tabUrls = [];
		for (var j = 0; j < currentWindow.tabs.length; j++) {
        tabUrls[tabUrls.length] = currentWindow.tabs[j].url;
		console.log(tabUrls[tabUrls.length - 1]);
	  }
	  collectionID=document.getElementById('collectionID').value;
	  chrome.storage.sync.set({[collectionID]:tabUrls}, function() {
          // Notify that we saved.
          //message('Settings saved');
		  console.log('All Urls are saved');
  });
    });
  
}

function populateCollectionFromStorage() {
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);

        allKeys.forEach(function(item){ 
        {
                var newOption = document.createElement("option");
                newOption.text = item.toString();

               dynamicSelect.add(newOption);
        }
		});

});
}