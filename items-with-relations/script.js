const fs = require('fs')
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


// 3rd phase of script

fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-cleaned-phase1-flatItems.json', 'utf8', (err, data) => {
    if(err){
        console.log(err)
        return
    }
    let flatItems = JSON.parse(data)
    fs.readFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-recipes-map.json', 'utf8', (error, recipeData)=>{
        if(error){
            console.log(error)
            return
        }
        let finalRelationshipMap = JSON.parse(recipeData)
        for (item of flatItems){
            if (finalRelationshipMap[item['name']]){
                item['isMadeOf'] = finalRelationshipMap[item['name']]
            }else{
                item['isMadeOf'] = []
            }
            console.log(finalRelationshipMap[item['name']],item)
        }
        fs.writeFile('/home/pathfinder/Desktop/working-projects/dota2-items/dota2-items-data-scraping-puppeteer/dota-item-with-relations.json', JSON.stringify(flatItems), err => {
            if(err){
                console.log(err)
                return
            }
        })
    })
})