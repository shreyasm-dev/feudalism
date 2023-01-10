import { readFileSync } from 'fs';
import { resolve } from 'path';

// Source: https://www.st-andrews.ac.uk/~cr30/vocabulary/
const words = readFileSync(resolve(__dirname, './dictionary.txt'), 'utf8')
  .trim()
  .split('\n')
  .map((word) => word.split(', ')[0]);

export default words;

export const unfiltered = readFileSync(resolve(__dirname, './dictionary.txt'), 'utf8')
  .trim()
  .split('\n');
