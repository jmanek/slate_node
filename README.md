[Slate](https://github.com/tripit/slate) with node.js
========
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A port of the documentation generator Slate to node.js.  
[See it](http://jmanek.github.io/slate_node/) in action!

The major difference is the use of [marked](https://github.com/chjj/marked) for parsing the .md, [highlight](https://highlightjs.org/) for syntax highlighting, and [Handlebars](http://handlebarsjs.com/) for templating.  


### Running

1. Clone the repo, install the npm modules.
2. Run `node marked.js`
3. This will build the page and save it to /source/index.html 
4. You're done!  

- Replace /source/index.md with your own markdown to use that instead

### Todo/Bugs

- Package it in a more modular way (Grunt?)
- marked seems to be handling tables a bit differently, if there's too many em-dashes it's failing
- highlight.js might have some differences in language detection than Rouge; at the very least 'shell' becomes 'bash'.  Ideally this repo should be compatible with any markdown made for Ruby Slate.
- Cleanup how marked parses the top-level settings.  Right now they are manually being parsed.
- Actually build the scss/js
- Allow you to choose from highlight's different themes
