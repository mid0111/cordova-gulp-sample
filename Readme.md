Gulpfile for cordova project
====

Sample project for cordova developed with gulp.  
Build js file using browserify(babelify), then build cordova application using command line from npm script.  


## Note

Default target platform is android and browser.

## Usage

### Init project

```bash
npm install
gulp
```

### Build

```bash
npm run build
```

## Folder structure

```
.
├── build  # Output folder for cordova build.
├── gulpfile.js
├── node_modules
├── package.json
└── source # Source folder for build/www
    ├── app.js
    ├── css
    ├── img
    ├── index.html
    └── js
```
