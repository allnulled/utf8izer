# utf8izer

Convert files into UTF-8 encoded files from CLI or API comfortably.

## Installation

`npm i -g utf8izer`

## Usage

There is an API and a CLI available for `utf8izer`.

### CLI usage

Simply pass all the files, and they will be converted to UTF-8 encoded files:

`utf8izer file1.csv file2.txt file3.data`

After this, a small report will be given by console.

### API usage

Import the module:

```js
const Utf8izer = require("utf8izer");
```

Usage with strings:

```js
const stringToUtf8 = Utf8izer.convertString("Some string that is not UTF-8");
```

Usage with files:

```js
Utf8izer.convertFiles(["file1.csv", "file2.txt", "file3.data"]).then(function(info) {
    // You can check the files that could not be converted like this:
    if(info.errors.length) {
        return console.log("Errors on UTF8 file conversions:", info.errors);
    }
    // Otherwise, everything was fine, and all the files were converted.
});
```

You do not need to catch the promise, as it will never be thrown.

## Issues

Report the issues you found at the `issues` tab of the project.

## License

This project is licensed under [WTFPL (do What The Fuck you want Public License)](https://en.wikipedia.org/wiki/WTFPL), so simple.