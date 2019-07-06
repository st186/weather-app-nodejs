const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Subham Tewari'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title : 'About Me',
        name : 'Created by Subham Tewari'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }

        res.send({
            forecast : forecastData,
            location, 
            address : req.query.address
        })
    })
    // res.send({
    //     address:req.query.address
    // })
    
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : "We are here to help",
        title : 'Help',
        name : 'Subham Tewari'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Andrew Mead',
        errorMessage : 'Page Not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Subham',
        errorMessage : 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})