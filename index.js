const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://dota2.fandom.com/wiki/Items");

  const itemLists = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".itemlist"), (itemlist) => {
      let subCatagory =
        itemlist.previousSibling.previousSibling?.textContent.trim() || "null";
      let mainCatagory =
        itemlist.previousSibling.previousSibling.previousSibling.previousSibling?.textContent.trim() ||
        "null";
        const item = Array.from(itemlist.querySelectorAll("div"), (div) => ({
        name: div.querySelectorAll("a")[1].title,
        mainCatagory: mainCatagory,
        subCatagory: subCatagory,
        itemURL: div.querySelectorAll("a")[0].href,
        thumbnailURL:
          div.querySelector("a img").getAttribute("data-src").split('scale-to-width-down')[0] || 'no src' ,
        goldCost:
          div.querySelectorAll("b")[0]?.textContent.trim() || "0",
      }));

      return item
    })
  );

//  TODO:
  //   }
//   "name": "Aghanim's Blessing - Roshan",
//   "mainCatagory": "null",
//   "subCatagory": "Roshan Drop",
//   "itemURL": "https://dota2.fandom.com/wiki/Aghanim%27s_Blessing_-_Roshan",
//   "thumbnailURL": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
//   "goldCost": "0"
//  },

//  TODO:
// {
//   "name": "Venom Gland",
//   "mainCatagory": "null",
//   "subCatagory": "Unreleased",
//   "itemURL": "https://dota2.fandom.com/wiki/Venom_Gland",
//   "thumbnailURL": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
//   "goldCost": "0"
// },

  console.log(itemLists);

  fs.writeFile("dota-item.json", JSON.stringify(itemLists), (err) => {
    if (err) throw err;
  });

  await browser.close();
}

run();
