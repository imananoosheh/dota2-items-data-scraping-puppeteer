const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto('https://dota2.fandom.com/wiki/Items');

  const itemLists = await page.evaluate(()=> Array.from(document.querySelectorAll('.itemlist'),(e)=>({
    name: e.querySelectorAll('a')[0].title,
    itemURL: e.querySelectorAll('a')[0].href,
    thumbnailURL: e.querySelectorAll('a img')[0].src.split('scale-to-width-down')[0],
    goldCost: e.querySelectorAll('b')[0]?.textContent || "Not patched."
  })))

//   {
//     name: div.querySelectorAll('a')[0].title
//     itemURL: div.querySelectorAll('a')[0].href
//     thumbnailURL: div.querySelectorAll('a img')[0].src.split('scale-to-width-down')[0]
//     goldCost: div.querySelectorAll('b span')[0].innerText
// }

  console.log(itemLists)

  await browser.close();
}

run();
