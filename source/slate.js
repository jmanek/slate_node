/*
Copyright 2018 Jesse Manek
Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under
*/

const configure = () => {
  marked.setOptions({
    highlight: (code, lang) => hljs.highlight(lang, code).value
  });
  
  // Easier than changing Slate's js
  marked.defaults.langPrefix = 'highlight ';
  
  // Create syntax-highlighting alias 'shell' for 'bash'
  hljs.registerLanguage('shell', highlight => hljs.getLanguage('bash'));
  
  Handlebars.registerHelper('str', item => '"' + item + '"');
  
  Handlebars.registerHelper('html', content => new Handlebars.SafeString(content));
};

const parserHeader = (markdown) => {
  const tokens = new marked.Lexer().lex(markdown[1]);
  const header = {};
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.type === 'list_item_start') {
      token = tokens[i + 1].text;
      if (listName === 'language_tabs') {
        token = {name: token.split(':')[0], text: token.split(':').pop()}
      }
      header[listName].push(token);
      i += 2;
    }
    if (token.type === 'paragraph') {
      if (tokens[i + 1] !== undefined && tokens[i + 1].type === 'list_start') {
        var listName = token.text.slice(0, -1);
        header[listName] = [];
      } else {
        token = token.text.split(': ');
        header[token[0]] = token[1];
      }
    }
  }
  return header;
};

// filePath is relative to this file
const getFile = filePath => {
  if (isNode) return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
  return $.get(filePath);
};

// Reads in source/slate.md and uses that to populate the 
// <body> element of source/index.html with generated documentation
const createDocs = async () => {
  let  markdown = (await getFile('slate.md')).split(/---/g);
  const data = {content: marked(markdown.slice(2).join('')), ...parserHeader(markdown)};
  data.content += await data.includes.reduce(async (includes, include) => 
    includes + '\n' +  marked(await getFile('includes/_' + include + '.md')), '');
  $('body').html(Handlebars.compile(await getFile('layouts/layout.html'))(data));
};

const isNode = typeof process === 'object';

if (isNode) {
  var fs = require('fs');
  var fse = require('fs-extra');
  var hljs = require('highlight.js');
  var marked = require('marked');
  var Handlebars = require('handlebars');
  var $ = require('cheerio').load(getFile('index.html'));
  configure();
  createDocs();
  $('#slatejs').remove();
  fse.copy(__dirname, __dirname + '/../build')
  .then(() => fs.writeFileSync(__dirname + '/../build/index.html', $.html()));
} else {
  $(document).ready(() => {
    configure();
    createDocs();
  });
}