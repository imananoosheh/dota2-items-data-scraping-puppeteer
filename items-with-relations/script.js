const fs = require("fs");
// let dotaJSONData, flatItems
// // we need the first 16 list.
// fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-cleaned-phase1.json', 'utf8', (err,data) => {
//     if(err){
//         console.log(err)
//         return;
//     }
//     // console.log(data)
//     dotaJSONData = JSON.parse(data)
//     flatItems =  Array.from(dotaJSONData).slice(1,16).flat(Infinity)
//     // console.log(flatItems)
//     fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-cleaned-phase1-flatItems.json', JSON.stringify(flatItems), err => {
//         if(err){
//             console.log(err)
//         }
//     })
// })

//-------------------------------------------------------------
// 2nd phase of script
// fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-recipes.json', 'utf8', (err, data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     let itemRelations = JSON.parse(data)
//     let finalRelationshipMap = {}
//     for (relation of itemRelations){
//         let [key, value] = Object.entries(relation)[0]
//         //key is string , value is an array
//         value = value.filter((item)=> item !== key)
//         finalRelationshipMap[key] = value
//         fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-recipes-map.json', JSON.stringify(finalRelationshipMap), err => {
//             if(err){
//                 console.log(err)
//                 return
//             }
//         })
//     }
// })

//-------------------------------------------------------------
// 3rd phase of script
// fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-cleaned-phase1-flatItems.json', 'utf8', (err, data) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     let flatItems = JSON.parse(data)
//     fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-recipes-map.json', 'utf8', (error, recipeData)=>{
//         if(error){
//             console.log(error)
//             return
//         }
//         let finalRelationshipMap = JSON.parse(recipeData)
//         for (item of flatItems){
//             if (finalRelationshipMap[item['name']]){
//                 item['isMadeOf'] = finalRelationshipMap[item['name']]
//             }else{
//                 item['isMadeOf'] = []
//             }
//             console.log(finalRelationshipMap[item['name']],item)
//         }
//         fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-with-relations.json', JSON.stringify(flatItems), err => {
//             if(err){
//                 console.log(err)
//                 return
//             }
//         })
//     })
// })

//-------------------------------------------------------------
//4th phase of data integiration

// const items = require("../dota-item-cleaned-phase1.json");
// // slicing the first 16th catagories is meant to only get the items that are currently in the game.
// const currentlyAvailableItems = items.slice(1, 16).flat(Infinity);
// fs.writeFile(
//   "/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/items-with-relations/flat-items-wo-relations.json",
//   JSON.stringify(currentlyAvailableItems),
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//   }
// );

//-------------------------------------------------------------
//  5th phase:  data preparing and cleaning
// fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-recipes.json', 'utf8', (err, data)=> {
//     if(err){
//         console.log(err)
//         return
//     }
//     const recipes = JSON.parse(data)
//     let result = {}
//     for (const recipe of recipes){
//         const [key, value] = Object.entries(recipe)[0]
//         result[key] = value
//     }
//     fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/items-with-relations/flat-items-relations-map.json', JSON.stringify(result), err => {
//         if(err){
//             console.log(err)
//             return
//         }
//     })
// })

//-------------------------------------------------------------
//  6th phase of data integration of ***sample data***
//  adding relations between items as 2 type of relationships
//  type 1: item#1 ----isMadeOf----> item#2
//  type 2: item#1 -----canMake----> item#2

// let sampleData = {
//   "Satanic": ["Satanic", "Morbid Mask", "Claymore", "Reaver"],
//   "Force Staff": [
//     "Hurricane Pike",
//     "Force Staff",
//     "Staff of Wizardry",
//     "Fluffy Hat",
//     "Recipe",
//   ],
//   "Circlet": [
//     "Bracer",
//     "Wraith Band",
//     "Null Talisman",
//     "Urn of Shadows",
//     "Circlet",
//   ],
// };
// let sampleResult = {}
// for (const [key, value] of Object.entries(sampleData)) {
//   const itemIndex = value.indexOf(key);
//   let isMadeOf = [],
//     canMake = [];
//     isMadeOf = value.splice(itemIndex+1)
//    value.length>0 ? value.pop() : []
//     canMake = value
//     sampleResult[`${key}-canMake`] = canMake
//     sampleResult[`${key}-isMadeOf`] = isMadeOf
// }
// console.log(sampleResult)


//-------------------------------------------------------------
//  7th phase of data integration of real data
//  adding relations between items as 2 type of relationships
//  type 1: item#1 ----isMadeOf----> item#2
//  type 2: item#1 -----canMake----> item#2
let items = require("./flat-items-wo-relations.json");
const relations = require("./flat-items-relations-map.json");

for(const item of items){
    let isMadeOf = []
    let canMake = []
    const itemName = item['name']
    console.log(itemName)
    if(item['mainCatagory'] == 'Neutral Items'){
        item['canMake'] = canMake
        item['isMadeOf'] = isMadeOf
        continue
    }
    let itemRelations = relations[itemName]
    const itemIndex = itemRelations.indexOf(itemName);
    isMadeOf = itemRelations.splice(itemIndex+1)
    if(itemRelations.length > 0){
        itemRelations.pop()
    }
    canMake = itemRelations
    item['canMake'] = canMake
    item['isMadeOf'] = isMadeOf
}
fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/items-with-relations/final-items-with-relations.json', JSON.stringify(items), err => {
    if(err){
        console.log(err)
        return;
    }
})
