# utf8izer

Encode files from CLI or API, comfortably.

## Installation

`$ npm i -g utf8izer`

## Usage

There is an **API** and a **CLI** available for `utf8izer`.

### CLI usage

Pass the files and, optionally, the original and final encodings:

```bash
utf8izer --from ascii --to utf8 file1.csv file2.txt file3.data
```

After this, a small report will be given by console.

### API usage

Import the module:

```js
const Utf8izer = require("utf8izer");
```

Use the main class:

```js
Utf8izer.convertFiles(["file1.csv", "file2.txt", "file3.data"], {
    from: "ascii",
    to: "utf8"
}).then(function(info) {
    if(info.errors.length) {
        return console.log("Errors on UTF8 file conversions:", info.errors);
    }
});
```

You do not need to catch the promise, as it will never be thrown.

## Issues

Report the issues you found at the `issues` tab of the project.

## License

This project is licensed under [WTFPL (do What The Fuck you want Public License)](https://en.wikipedia.org/wiki/WTFPL), so simple.