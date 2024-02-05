import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/homeRouter.js'

// Get the path of the current module's directory.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// Create Express application.
const app = express()

// Set up a morgan logger using the dev format to log entries.
app.use(logger('dev'))

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.use(expressLayouts)
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

// Middleware to be executed before the routes.
app.use((req, res, next) => {
    // Pass the base URL to the views.
    res.locals.baseURL = baseURL

    next()
})

// Register routes.
app.use('/', router)

// Error handler middleware.
app.use(function (err, req, res, next) {
    console.error(err)

    /* This error handling isn't recommended, it leaks too much information to someone with malicious intent */
    res
    .status(err.status || 500)
    .send(err.message || 'Internal Server Error')
})

// Starts the HTTP server listening for connection.
const server = app.listen(process.env.PORT, () => {
    console.log('Server running at http://localhose:${server.address().port}')
    console.log('Press Ctrl-C to terminate...')
})

// Minnesanteckningar från föreläsningarna:
/* Server.js jobbar med filerna som finns i routes, routes med det som finns i controllers, controllers använder sig av det som finns i views */

/* Server.js purpose is to create an instance of an Express application, config it and start it as an Express server */

/* Middleware funcs have access to req, res-objects and next middleware func in the req-res cycle */

/* The above code will run once, at the start of the application */



  

