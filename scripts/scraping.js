"use strict";
const fetch = require("node-fetch");
const { parse } = require("node-html-parser");
const fs = require("fs");
const baseURL = "https://dictionary.goo.ne.jp/quote/";

const getPage = async (num) => {
    const URL = baseURL + num + "/";
    const ret = await fetch(URL);
    if (!ret.ok) return Promise.reject(ret);
    return ret.text();
};

const getQuote = async (num) => {
    const root = parse(await getPage(num));
    const divs = root.querySelectorAll("div.sayingLBlockInner");
    const data = divs.map(div => {
        const quote = div.querySelector("p").rawText;
        const author = div.querySelector("strong").rawText;
        return { quote, author };
    });
    return data;
}

const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const main = async () => {
    let ret = [];
    for (let i = 1; i <= 287; i++) {
        await wait(500);
        console.log(i);
        ret = ret.concat(await getQuote(i));
    }
    const json = JSON.stringify(ret);
    fs.writeFile("quotes.json", json, () => {});
}

main().catch(console.log);
