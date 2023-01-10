# feudalism

Turn your code into a fiefdom

## Installation

```
npm i -g feudalism
```

## Usage

```
Usage: feudalism [options] [command]

Turn your code into a fiefdom

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  search|s <term>         Search for a word in the dictionary
  run|r [options] <file>  Run a file through the feudalizer
  help [command]          display help for command
```

You can also use it programatically like this:

```
import { feudalize } from 'feudalism';

console.log(feudalize('const x = 5;'));
```

## License

This project is licensed under the MIT license.
