/**
 * @name Utf8izer
 * @type Class
 * @description Class to convert files from one encoding to another.
 */
class Utf8izer {

    /**
     * @name Utf8izer.DEFAULT_CONVERSION_OPTIONS
     * @type Static class property.
     * @description Default options of the encoding conversions made by this class.
     */
    static get DEFAULT_CONVERSION_OPTIONS() {
        return { from: "ascii", to: "utf8" };
    }

    /**
     * @name Utf8izer.convertFile
     * @type Static class method.
     * @param {String} file. File to convert.
     * @param {Object} optionsParameter. Options of the encoding.
     * @returns {Promise} promise.
     * @description Converts a file from one encoding to another.
     */
    static convertFile(file, optionsParameter = {}) {
        const fs = require("fs");
        const options = Object.assign({}, this.DEFAULT_CONVERSION_OPTIONS, optionsParameter);
        return new Promise((success, failure) => {
            // Firstly, read file with encoding --from:
            return fs.readFile(file, { encoding: options.from }, function (errorReading, data) {
                if (errorReading) {
                    return failure(errorReading);
                }
                // Secondly, write file with encoding --to:
                return fs.writeFile(file, data, { encoding: options.to }, function (errorWriting) {
                    if (errorWriting) {
                        return failure(errorWriting);
                    }
                    return success();
                });
            });
        });
    }

    /**
     * @name Utf8izer.convertFiles
     * @type Static class method.
     * @param {Array<String>} filesParameter. List of files to convert.
     * @param {Object} options. Options of the conversion.
     * @returns {Promise} promise.
     * @description Converts multiple files from one encoding to another.
     */
    static convertFiles(filesParameter, options = {}) {
        let finished = 0;
        const files = [].concat(filesParameter);
        const errors = [];
        return new Promise((success, failure) => {
            const onFinish = () => {
                finished++;
                if (finished === files.length) {
                    return success({ errors });
                }
            };
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.convertFile(file, options).then(onFinish).catch((error) => {
                    errors.push({ file, error });
                    return onFinish();
                });
            }
        });
    }
    
}

module.exports = Utf8izer;