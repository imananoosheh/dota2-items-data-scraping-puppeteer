const puppeteer = require("puppeteer");
const fs = require("fs");
const dotaItemData = require("./dota-item-cleaned-phase1.json");

async function getRecipes() {
  for (let i = 8; i < 11; i++) {
    let currentSubCat = dotaItemData[i];
    for (let j = 0; j < currentSubCat.length; j++) {
      const currentItemURL = currentSubCat[j]["itemURL"];
      const currentItemName = currentSubCat[j]["name"];
      console.log(`entring item:${currentItemName} url:`, currentItemURL);
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(currentItemURL, { waitUntil: "load", timeout: 0 });

      //   const randomTime = Math.floor((Math.random() * 1000) + 500);
      //   await page.waitFor(randomTime);
      const ingredients = await page.evaluate(() =>
        Array.from(
          document
            .querySelectorAll("tbody tbody tr:last-child")[0]
            .querySelectorAll("a"),
          (aTag) => aTag.getAttribute("title").split("(")[0].trim()
        )
      );
      let record = {};
      record[currentItemName] = ingredients;
      fs.appendFile("dota-item-recipes.json", JSON.stringify(record), (err) => {
        if (err) throw err;
      });
      console.log(ingredients);
      await browser.close();
    }
  }
  return true;
}
getRecipes();
