const puppeteer = require("puppeteer");
const fs = require("fs");
const dotaItemData = require('./dota-item-cleaned-phase1.json')

async function getRecipes(){
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    for(let i=0; i<11; i++){
        let currentSubCat = dotaItemData[i]
        for(let j=0; j< currentSubCat.length; j++){
            const currentItemURL = currentSubCat[j]['itemURL']
            console.log('entring this url:',currentItemURL)
            await page.goto(currentItemURL);

            let ingredients = await page.evaluate(()=> {
                let currentAnchors = Array.from(document.querySelectorAll('tbody tbody tr:last-child')[0].querySelectorAll('a'), (aTag,k)=>{
                    console.log(aTag)
                    return {
                        name: aTag.getAttribute('title').split('(')[0].trim(),
                        itemURL: aTag.getAttribute('href').trim(),
                        thumbnailURL: aTag.querySelector('img').src.split('scale-to-width-down')[0],
                    }
                })
                console.log(currentAnchors)
                let itemMadeOf = currentAnchors.splice(0,1)
                let record = {}
                record[itemMadeOf[0].name] = currentAnchors
                return record
            })
            console.log(ingredients)
        }
    }
}
getRecipes()

//TODO: Add Differentiator for "UsedOf" and "Components" from alt text of img between anchor tags