#!/usr/bin/env node

const Utf8izer = require(__dirname + "/../src/utf8izer.js");
const args = require("yargs")
    .usage("Usage: $0 [options] <files>")
    .version(require(__dirname + "/../package.json").version)
    .option("from", {
        type: "string",
        default: "ascii",
        describe: "Original encoding.",
    })
    .option("to", {
        type: "string",
        default: "utf8",
        describe: "Destination encoding.",
    }).argv;
const files = args._;
console.log(`[utf8izer] Converting ${files.length} files from <${args.from}> encoding to <${args.to}> encoding.`);
Utf8izer.convertFiles(files, args).then((info) => {
    if (info.errors.length) {
        console.log("[failure] Errors on utf-8 file conversions:");
        for (const error in info.errors) {
            console.log("  - " + error.file);
            console.log("    [error:]", error.error);
        }
    } else {
        console.log("[success] All utf-8 conversions were successful");
    }
    return info;
});