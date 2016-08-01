## Website Performance Optimization portfolio project
--------------------------

## Getting started
1. Download the project
2. Navigate to the project directory and `$ npm install`
3. Starting a server
    * Development
        * In the project directory type `$ gulp`
    * Production Build
        * In the project directory type `$ gulp publish`

--------------------------

## Optimizations

* Optimizations made to views/main.js
    * Removed all `document.querySelector()` and replaced with `document.getElementById()`
    * Removed all `document.querySelectorAll()` and replaced with `document.getElementsByClassName()`
    * Added a local storage var to avoid accesing the dom in the for loop
    * Added `cacheScrollTop` to cache a scroll call
        * All credit for this solution goes to [this](https://youtu.be/hAzhayTnhEI?t=728) great google developers talk
    * Added `cachePizzaSizes` to precalculate the pizza sizes
    * Changed `changePizzaSizes` to use the `cachePizzaSizes` so that the change is not recalculated every pizza

* Optimizations made to index.html
    * Concatenated CSS and JS files to decrease server requests
    * Minified HTML, CSS, and JS to decrease file size
    * Compressed all images to decrease file size
    * Resized `pizzeria.jpg` to 200px x 150px to decrease file size
    * Inlined critical css using [Critical](https://www.npmjs.com/package/critical) to remove render blocking css

--------------------------

## Gulp

* Development
    * `$ gulp`
        * Starts a production server using browser sync
        * Updates server on file change
* Production
    * `$ gulp build:production`
        1. Cleans the dist folder excluding both img folders
        2. Concatenates and Minifies CSS and JS
        3. Inlines CSS
        4. Minifies HTML
    * `$ gulp publish`
        1. Runs build:production
        2. Starts a browser sync server
        3. Tunnels to ngrok and prints the ngrok url to console
        4. Runs PSI and displays speed scores in console

* Both servers will run at the same time dev will be on port 9999 and production on 9998

--------------------------

## Useful and Used Resources
* Gulp
    * [CSS tricks gulp turorial](https://css-tricks.com/gulp-for-beginners/)
    * [Very in depth gulp tutorial](https://github.com/kogakure/gulp-tutorial)
    * [Getting ngrok and psi working together](https://una.im/gulp-local-psi/)
        * Some outdated references so modify to ngrok and psi current api's
* Optimization
    * [Helpful Google Developers talk](https://www.youtube.com/watch?v=hAzhayTnhEI)
    * [Dom access optimization](http://www.phpied.com/dom-access-optimization/)