// ==UserScript==
// @name         JSONATA JAVA Checker
// @namespace    https://github.com/petrfilip/jsonata-java-checker-tampermonkey
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://try.jsonata.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jsonata.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    let layout = getElementByXpath("/html/body/div[1]/div/main/div/div/div[2]/div")

    let remoteOutputDivider = document.createElement("SPAN");
    remoteOutputDivider.classList.add('Resizer', 'horizontal');
    layout.append(remoteOutputDivider);

    let remoteOutput = document.createElement("PRE");
    remoteOutput.style.cssText = 'overflow:auto;flex: 1 1 0%; position: relative; color: khaki;';
    remoteOutput.innerText = 'Click the button'
    layout.append(remoteOutput);

    let remoteOutputNotify = document.createElement("DIV");
    remoteOutputNotify.style.cssText = ' color: red;';
    remoteOutputNotify.innerText = 'Click the button'
    layout.append(remoteOutputNotify);

    let btn = document.createElement("BUTTON");
    btn.setAttribute('content', 'test content');
    btn.setAttribute('class', 'btn');
    btn.style.cssText = 'padding: 5px;';
    btn.textContent = 'http://localhost:8097/usy-idsmari-mddpg01/02000000000000000000000000000009';

    btn.onclick = () => {

        var inputValue = monaco.editor.getModel("inmemory://model/1").getValue().replace(/&nbsp;/g, ' ').trim();
        var expression = monaco.editor.getModel("inmemory://model/3").getValue().replace(/&nbsp;/g, ' ').trim();
        var result = monaco.editor.getModel("inmemory://model/4").getValue().replace(/&nbsp;/g, ' ').trim();

        var dtoIn = {
            "expression": expression,
            "inputValue": inputValue
        };


        postData('http://localhost:8097/usy-idsmari-mddpg01/02000000000000000000000000000009/mddp/debug/jsonata', dtoIn)
            .then(data => {
                remoteOutput.innerText = JSON.stringify(data, undefined, 2);
                remoteOutputNotify.innerText = JSON.stringify(JSON.parse(result)) === JSON.stringify(data);
            });
    };


    var rightMenu = document.getElementById("banner4");
    rightMenu.prepend(btn)
})();