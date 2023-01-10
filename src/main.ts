#!/usr/bin/env node

import sourceMapSupport from 'source-map-support';
import { readFileSync, writeFileSync, existsSync } from 'fs';
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
  .option('-a, --ast', 'Output the AST')
  .option('-o, --output <file>', 'Output to a file')
  .description('Run a file through the feudalizer')
  .action((file, { module, ast, output }) => {
    const source = readFileSync(resolve(process.cwd(), file), 'utf8');
    const feudalized = feudalize(
      {
        ecmaVersion: 'latest',
        sourceType: module ? 'module' : 'script',
      },
      source,
      {},
      (name) => [...Array(name.length + Math.floor(Math.random() * 10))].map((_, i) => {
        const word = words[Math.floor(Math.random() * words.length)];
        return i !== 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word;
      }).join(''),
      ast,
    );

    if (output) {
      if (existsSync(resolve(process.cwd(), output))) {
        console.error(`File ${output} already exists`);
        process.exit(1);
      }

      writeFileSync(resolve(process.cwd(), output), feudalized);
    } else {
      console.log(feudalized);
    }
  });

program.parse(process.argv);
