let itemData = require('./dota-item.json')
const fs = require("fs");

// console.log(itemData[4])
const mainCatagoryMap = {
    0:'Basics Items',
    1:'Basics Items',
    2:'Basics Items',
    3:'Basics Items',
    4:'Basics Items',
    5:'Upgraded Items',
    6:'Upgraded Items',
    7:'Upgraded Items',
    8:'Upgraded Items',
    9:'Upgraded Items',
    10:'Upgraded Items',
    11:'Neutral Items',
    12:'Neutral Items',
    13:'Neutral Items',
    14:'Neutral Items',
    15:'Neutral Items',
    16:'Neutral Items',
    17:'Neutral Items',
    18:'Roshan Drop',
    19:'Unreleased Items',
    20:'Removed Items',
    21:'Removed Items',
    22:'Event Items',
    23:'Event Items',
    24:'Event Items',
    25:'Event Items',
    26:'Event Items',
    27:'Event Items',
    28:'Event Items',
}

const subCatagoryMap = {
    20:'Dota 2',
    21:'DotA',
}


function clean(){
    for (let i=0; i< itemData.length; i++){
        for (item of itemData[i]){
            item['mainCatagory'] = mainCatagoryMap[i]
            if(subCatagoryMap[i]){
                item['subCatagory'] = subCatagoryMap[i]
            }
            // subcatagory number 22-27:
            // name.split('/')[1]
            if(i>=22 && i<28){
                item['name'] = item['name'].split('/')[1]
            }
        }
    }
}

clean()
console.log(itemData)
fs.writeFile("dota-item-cleaned-phase1.json", JSON.stringify(itemData), (err) => {
    if (err) throw err;
  });