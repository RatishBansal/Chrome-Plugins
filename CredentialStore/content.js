// content.js - this is what you pass to `executeScript`
var s = document.createElement('script');
s.src = chrome.runtime.getURL('test.js'); // This is the actual script
s.onload = function() {
    this.parentNode.removeChild(this);};
(document.head||document.documentElement).appendChild(s);