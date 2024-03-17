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



# Self-signed cert for liveserver
## Windows
1. Download OpenSSL
2. Open Windows File Explorer.
3. Navigate to the OpenSSL bin directory.
> c:\OpenSSL\bin\ in our example.
4. Right-click the openssl.exe file and select Run as administrator.
5. Enter the following command to begin generating a certificate and private key:
> req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
6. You will then be prompted to enter applicable Distinguished Name (DN) information, totaling seven fields:
7. Once completed, you will find the certificate.crt and privateKey.key files created under the \OpenSSL\bin\ directory
8. Enter the paths to .vscode/settings.json
{
  "liveServer.settings.https": {
  "enable": true, //set it true to enable the feature.
  "cert": "c:\\OpenSSL\\bin\\liveserver.crt", //full path of the certificate
  "key": "c:\\OpenSSL\\bin\\liveserver.key", //full path of the private key
  "passphrase": ""
  }
}