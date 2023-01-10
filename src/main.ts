import sourceMapSupport from 'source-map-support';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { program } from 'commander';
import words, { unfiltered } from './dictionary';
import { feudalize } from './feudalizer';

sourceMapSupport.install();

// Turns your identifiers into feudal words

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

program
  .command('run')
  .alias('r')
  .argument('<file>', 'The script to feudalize')
  .option('-m, -module', 'Use ES modules')
  .description('Run a file through the feudalizer')
  .action((file, module) => {
    const source = readFileSync(resolve(process.cwd(), file), 'utf8');
    console.log(JSON.stringify(feudalize(
      {
        ecmaVersion: 'latest',
        sourceType: module ? 'module' : 'script',
      },
      words,
      source,
      {},
      () => words[Math.floor(Math.random() * words.length)],
    ), null, 2));
  });

program.parse(process.argv);
