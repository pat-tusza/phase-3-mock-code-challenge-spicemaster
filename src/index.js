// write your code here


const div = document.querySelector('div#spice-blend-detail')
const spiceUrl = 'http://localhost:3000/spiceblends'
const ingredUrl = 'http://localhost:3000/ingredients'

function spiceHtml(spice){
    const img = div.querySelector('img')
    const h2 = div.querySelector('h2')
    img.src = spice[0].image
    img.alt = spice[0].title
    h2.innerText = `${spice[0].title}`
}

function ingredHtml(ingreds){
    const ul = div.querySelector('ul')
    ingreds.forEach(ingred => {
        if (ingred.spiceblendId == 1) {
            const li = document.createElement('li')
            li.innerText = `${ingred.name}`
            ul.append(li)
        }
    })
}

function loadSpice(){
    fetch(spiceUrl)
    .then(res => res.json())
    .then(spice => spiceHtml(spice))
}

function loadIngred(){
    fetch(ingredUrl)
    .then(res => res.json())
    .then(ingred => ingredHtml(ingred))
}
function loadDb(){
    loadSpice()
    loadIngred()
}









loadDb()