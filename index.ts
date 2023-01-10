const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const proxy = require('http-proxy-middleware')
const proxyConfig = require('./proxyConfig')
const cors = require('cors')

const app = express(bodyParser.urlencoded({extended: true}))

app.use(function(req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors())

const ebaySandbox = 'https://api.sandbox.ebay.com'

const ebayAuthToken = new EbayAuthToken({
    filePath: `${__dirname}/ebayConfig.json`
});

const token = ebayAuthToken.getApplicationToken('SANDBOX');
/*const parsedToken = JSON.parse(token).access_token*/

const options = {
    method: 'GET',
    /*headers: {
        Authorization: `Bearer ${parsedToken}`
    }*/
}

app.get('/', (req: any, res: any) => {
    const request = https.request(`${ebaySandbox}/buy/browse/v1/item_summary/search?q=drone&limit=3`, options, (response: any) => {
        response.on('data', (data: any) => {
            console.log(JSON.parse(data))
        })
    })
    request.end()
})

app.get('/login', async (req: any, res: any) => {
    const authUrl = ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', 'https://api.ebay.com/oauth/api_scope/buy.guest.order')
    res.send(authUrl)
})

app.listen(3001, () => {
    console.log('Server started on port 3001')
})
