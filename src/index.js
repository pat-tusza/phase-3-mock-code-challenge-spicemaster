// write your code here


const div = document.querySelector('div#spice-blend-detail')
const spiceUrl = 'http://localhost:3000/spiceblends'
const ingredUrl = 'http://localhost:3000/ingredients'
const updateForm = document.querySelector('form#update-form')
const newForm = document.querySelector('form#ingredient-form')

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

updateForm.addEventListener('submit',function(event){
    event.preventDefault()
    const title = event.target[0].value

    const updatedTitle = {title}

    fetch(spiceUrl+'/1', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(updatedTitle)
    })

    .then(res => res.json())
    .then(updatedTitle => {
        const h2 = div.querySelector('h2')
        const img = div.querySelector('img')
        img.alt = updatedTitle.title
        h2.innerText = `${updatedTitle.title}`
    })
    event.target.reset()
})

newForm.addEventListener('submit',function(event){
    event.preventDefault()
    console.log(event)
    const name = event.target[0].value
    const spiceblendId = 1

    const newIngred = {name, spiceblendId}

    fetch(ingredUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(newIngred)
    })

    .then(res => res.json())
    .then(newIngred => {
        const ul = div.querySelector('ul')
        const li = document.createElement('li')
            li.innerText = `${newIngred.name}`
            ul.append(li)
    })
})









loadDb()