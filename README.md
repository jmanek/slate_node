[Slate](https://github.com/tripit/slate) with node.js
========
A port of the documentation generator Slate to node.js.  
[See it](http://jmanek.github.io/slate_node/) in action!

I was looking to create API docs and Slate's UI was exactly what I wanted.  I came upon this *glaring* issue though.  I had to use Ruby!  Not that there's anything wrong with that!  But I want to be able to host it on our site, and use the same framework throughout to build everything -- I can't justify setting up Ruby to create one page.  

The major difference is the use of [marked](https://github.com/chjj/marked) for parsing the .md, [highlight](https://highlightjs.org/) for syntax highlighting, and [Handlebars](http://handlebarsjs.com/) for templating.  


### Running

1. Clone the repo, install the npm modules.
2. Run `node marked.js`
3. This will build the page and save it to /source/index.html 
4. You're done!  

- Replace /source/index.md with your own markdown to use that instead

### Todo/Bugs

