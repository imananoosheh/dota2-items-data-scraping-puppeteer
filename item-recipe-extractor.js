//document.querySelectorAll('tbody tbody tr:last-child')[0].querySelectorAll('a')
// [1:length]
let ingredients = Array.from(document.querySelectorAll('tbody tbody tr:last-child')[0].querySelectorAll('a'), (aTag,k)=>{
    return {
        name: aTag.getAttribute('title').split('(')[0].trim(),
        itemURL: aTag.getAttribute('href').trim(),
        thumbnailURL: aTag.querySelector('img').src.split('scale-to-width-down')[0],
    }
})
let itemMadeOf = ingredients.splice(0,1)
let record = {}
record[itemMadeOf[0].name] = ingredients

console.log(record)