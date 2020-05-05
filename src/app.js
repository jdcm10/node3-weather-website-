
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const path = require('path')

const express = require('express')

const hbs = require('hbs') 

console.log(__dirname)


const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location 
app.set('view engine','hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> { 
    res.render('index', {
        title: 'Weather App',
        name: 'JD McDaniel'

    })

})

app.get('/about', (req, res) => {
    res.render('about', {
            title: "About Me",
            name: "JD McDaniel"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
            title: "Help",
            name: "JD McDaniel"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
  return res.send({
    error: "No address provided!"
})

}

geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
 if(error) {
     return res.send ({error})
 }

 forecast(latitude, longitude, (error, forecastData) => {
    if(error) {
        return res.send({error})
    }
res.send({
    forecast: forecastData,
    location, 
    address: req.query.address

})
 })

})

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })

    } 
    console.log(req.query.search)
    res.send({
        products: []
    })

})


app.get('/help/*', (req,res)=> {
    res.render('404',{
        title: '404 Help',
        name: 'JD McDaniel',
        errorMessage: 'Help article not found!'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: "404",
        name: 'JD McDaniel',
        errorMessage: 'Page not found!'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000') 
}) 