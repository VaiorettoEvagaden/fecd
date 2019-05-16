#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const program = require('commander');
const chalk = require('chalk');
const tar = require('tar');
const rimraf = require('rimraf');
const pkg = require('../package');


function debug(value, dummyPrevious) {
  console.log(value, dummyPrevious);
}

function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and an optional radix
  console.log(value, dummyPrevious);
  return parseInt(value, 10);
}
// require('../src/fecd');

program.version(pkg.version);

const [,, ...args] = process.argv;
console.log(`Hello ${args}`);
program
  .option('-d, --deploy <value>', 'dir to deploy', debug, 'dist')
  .option('-i, --integer <number>', 'integer argument', myParseInt)
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza', 'blue');

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});

program.parse(process.argv);
if (process.argv.length === 2) program.outputHelp();
// if (program.deploy) console.log(program.opts());
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);

// tar
tar.c(
  {
    gzip: true,
    file: 'my-tarball.tgz',
  },
  ['dist'],
).then();


const params = new FormData();
params.append('file', fs.createReadStream('dist/index.js'));
// axios.post('http://localhost:8080/upload', params, { headers: { 'Content-Type': '
// multipart/form-data' } }).then();
axios.post('http://127.0.0.1:8080/upload', params, { headers: { 'Content-Type': `multipart/form-data; boundary=${params._boundary}` } });
rimraf('my-tarball.tgz');
console.log(chalk.cyan(process.argv));
