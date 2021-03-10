<h1>Scroll Companion</h1>
Coded by: Patrick Osten
<br>
2/2021

**image**

-images forthcoming-

<h2>Project Description</h2>

The project is a chrome extension to help users spend time effectively when browsing the internet, by setting a timer for specific websites that prompts users to reflect on how long they've browsed, and what the goal of that browsing is. 

### Planned Additional features:
- options for customizing the notifications time duration, theme, buttons, and text
- link to external websites when the timer finishes
- 'ScrollComPAINion' where the windows is automatically closed when the timer finishes
- snapshot of active tab/content when the timer finishes
- better url parsing

<h3>Use</h3>

**URL parsing**
<details>
<summary>Code</summary>

```
chrome.tabs.onCreated.addListener(function() {
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(alarmSet){
      console.log("alarm already exists, shutting down now.")
    } else {
      console.log("watch on new tab")
      chrome.tabs.query({active: false, currentWindow: true}, tabs => {
        tabId = tabs[tabs.length-1].id;
        let url = tabs[tabs.length-1].pendingUrl;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords))
        if(userInput.keywords != ""){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    }
  }
});
```

</details>

1. A listener is attached to the onCreated or onHighlighted api, both instances run identically from there. 
2. User input contains a prop of watchMethod, which determines the api.
3. A global variable alarmSet checks is an arlam is running, and logs "alarm already exists, shutting down now." to the background page.
4. The Query api gets an array of all active tabs form the current window.
5. The array is mutated like this.
6. It then checks for keywords and domains.
7. If a match is found an alarm is created.
**APIs**

**Bugs**

-Bugs forthcoming-

**Resources**
- [Coding Train- Chrome Extensions Playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bL9VOMT65ahNEri9uqLWfS)
- [Evil Tester- How to Create a Chrome Extension - JavaScript Tutorial](https://www.youtube.com/watch?v=Olz4wo-ILwI)
- [Chrome Extension Docs:](https://developer.chrome.com/docs/extensions/mv2/)
    - [Getting Started](https://developer.chrome.com/docs/extensions/mv2/getstarted/)
    - [Messgae Passing](https://developer.chrome.com/docs/extensions/mv2/messaging/)
    - [Background Script](https://developer.chrome.com/docs/extensions/mv2/background_pages/)

**Technologies Used**

- Bootstrap 4.4.1
- Chrome manifest V2
- Javascript ES6
- HTML5
- CSS



Copyright 2021 Patrick Osten

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
