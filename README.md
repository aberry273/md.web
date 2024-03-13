# md.web
A simple markdown page bootstrapper


# setup instructions
1. Download VSCode extension LiveServer https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
2. Right click on index.html and 'open with live server'
3. Enjoy local site


# Modifying SCSS Instructions
## Sass is compiled locally with VSCode
1. Install picoscss to local folder with node/npm
> npm install @picocss/pico
2. Install Sass globally npm install -g sass
3. Create scss, see /_src_scss/ as example
4. Install scss-to-css 'extension;
5. Update output dir of scss-to-css to be the ~/css/ folder
4. Save app.scss file

sass --pkg-importer=node --load-path=/../../node_modules/@picocss/pico/scss/ --load-path=/../../../node_modules/@picocss/pico/scss/ --watch main.scss main.css