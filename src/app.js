const path = require('path')
const express = require('express')
const  hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath =path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname, '../templates/partials')

//Setup handlebars enginre and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title:'Simple Weather App',
        name: 'Ravi Kalahasthi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Ravi Kalahasthi'
    })
})

app.get('/help',(req,res)=>{
    console.log(req.query)
    res.render('help',{
        title: 'help',
        name: 'Ravi Kalahasthi'
    } )
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
     return res.send({error:'Please enter an address to fetch the weather'})
    }

    geocode(req.query.address,(error, {latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address 
            })
        })

    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        message: 'Help article is not found',
        name: 'Ravi Kalahasthi'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        message : '404',
        name: 'Ravi Kalahasthi'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})