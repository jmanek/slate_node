[Slate](https://github.com/tripit/slate) with node.js
========

A port of the documentation generator Slate to node.js, that can optionally be built in the browser.
[See it](http://jmanek.github.io/slate_node/) in action!

The major difference is the use of [marked](https://github.com/chjj/marked) for parsing the .md, [highlight](https://highlightjs.org/) for syntax highlighting, and [Handlebars](http://handlebarsjs.com/) for templating.  


## Building 

### Node.js
This outputs to the `build` directory. Replace `source/slate.md` with your own markdown to use that instead
```
git clone https://github.com/jmanek/slate_node.git
npm install 
npm run build
# Docs are now viewable at build/index.html
```

### Browser
Alternatively, you can directly serve the `source` directory from a webhost and the documentation will be built at runtime.  
```
git clone https://github.com/jmanek/slate_node.git
cd source
python3 -m http.server
# Docs are now viewable at http://0.0.0.0:8000/
```
Any changes to `source/slate.md` will be incorporated into `index.html` when it is reloaded. There is now no need to have node.js installed on the machine. This way you don't have to worry about incorpoting Slate into your current build process or creating an entirely new toolchain for it. It is a "static" version of Slate.  This is inherently slower than the node.js pre-built version, but it is completely independent of operating system or platform. You will not be able to view the documentation until deploying it to a server.

## Code Highlighting
[Numerous themes](https://highlightjs.org/static/demo/) for highlight.js are available in `source/stylesheets/highlight`. You can switch between them by changing this line in `source/index.html`
```html
<link href="stylesheets/highlight/solarized-dark.css" rel="stylesheet" type="text/css" />
```

## Includes
Includes are handled as described in the [Slate Wiki](https://github.com/lord/slate/wiki/Using-Includes). The filename must have an underscore prepended to it, which is not included in the markdown file description.

## Todo/Bugs

- Package it in a more modular way (Grunt?)
- marked seems to be handling tables a bit differently, if there's too many em-dashes it's failing
- highlight.js might have some differences in language detection than Rouge; at the very least 'shell' becomes 'bash'.  Ideally this repo should be compatible with any markdown made for Ruby Slate.
- Cleanup how marked parses the top-level settings.  Right now they are manually being parsed.
- Actually build the scss/js
