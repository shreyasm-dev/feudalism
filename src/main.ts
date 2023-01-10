import sourceMapSupport from 'source-map-support';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { program } from 'commander';
import words, { unfiltered } from './dictionary';

sourceMapSupport.install();

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version);

program
  .command('search')
  .alias('s')
  .description('Search for a word in the dictionary')
  .argument('<term>', 'The search term')
  .action((term) => console.log(unfiltered.filter((word) => word.split(', ')[0].includes(term)).join('\n')));

program.parse(process.argv);
