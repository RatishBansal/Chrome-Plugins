let saveState = document.getElementById('saveState');
let deleteState = document.getElementById('deleteState');
let clearAll = document.getElementById('clearAll');
let go = document.getElementById('go');
var dynamicSelect = document.getElementById("collectionDropDown");
window.onload = function() {
  populateCollectionFromStorage();
};
saveState.onclick = function(element) {
  saveCredentials();
};
deleteState.onclick = function(element) {
  deleteCredentials();
};

clearAll.onclick = function(element) {
  clearAllCollections();
};

go.onclick = function(element) {
  executeLogin();
};

function deleteCredentials() {
	e= document.getElementById("collectionDropDown");
	var strUser = e.options[e.selectedIndex].text;
  chrome.storage.sync.remove([strUser], function(result) {
          console.log('Deleted Successfully');
        });
}

function clearAllCollections() {
  chrome.storage.sync.clear(function(result) {
          console.log('Storage cleared');
        });
}

function saveCredentials() {
  collectionID=document.getElementById('collectionID').value;
  username=document.getElementById('username').value;
  password=document.getElementById('password').value;
  credentialData = {'username': username,'password':password};
  
	  chrome.storage.sync.set({[collectionID]:credentialData}, function() {
          // Notify that we saved.
          //message('Settings saved');
		  console.log('Credentials saved');
  });
}

function populateCollectionFromStorage() {
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);

        allKeys.forEach(function(item){ 
        {
                var newOption = document.createElement("option");
                newOption.text = item.toString();//item.whateverProperty

               dynamicSelect.add(newOption);
        }
		});

});
}

function executeLogin(){
	e= document.getElementById("collectionDropDown");
	var strUser = e.options[e.selectedIndex].text;
  chrome.storage.sync.get([strUser], function(result) {
          console.log('Value currently is ' + result.value);
		  urls= Object.values(result);
		  username=urls[0].username;
		  password=urls[0].password;
		 // execute Script here
		 executeScript(username,password);
		 console.log(username)
        });
}

function executeScript(username,password){
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0];
    chrome.tabs.executeScript(activeTab.id, {"code":
	"var s = document.createElement(\'script\');s.textContent =\'document.querySelector(\'input[type=\"text\"]\').value = \'admin\';document.querySelector(\'input[type=\"password\"]\').value = \'admin\';document.querySelector(\'input[type=\"submit\"]\').click();console.log(\'fpke\');\'s.onload = function() {this.parentNode.removeChild(this);};(document.head||document.documentElement).appendChild(s);"
	});
});
}