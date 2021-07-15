const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const generate = require('csv-generate');
const createCsvWriter = require('csv-writer').createObjectCsvWriter; //testing a csv write

const FileManager = {
    readFile: (filepath) => {
        try {
            return fs.readFileSync(filepath, 'utf8');
        } catch(error) {
            // TODO: Log error with winston
            console.error(error);
        }

        return null;
    },
    printCSV: async (filePath, fileName, header, records) => {
        if (!fileName || !filePath) {
            throw new Error('fileName or filePath is not defined');
        }

        if (_.find(header, (head) => !head.id || !head.title)) {
            throw new Error('header 0 does not have an id');
        }

        if (process.env.NODE_ENV === 'test') {
            const outputDir = path.resolve(__dirname + '../../../tests/output');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
        }

        const ids = _.pluck(header, 'id');
        const result = _.find(records, (record) => {
            const keys = _.keys(record);
            return _.find(keys, (key) => !ids.includes(key));
        });

        if (result) {
            throw new Error(`A record includes an unused property: ${JSON.stringify(result)}. Accepted keys are: ${ids.join(', ')}.`);
        }

        const csvWriter = createCsvWriter(
            {
                path: path.resolve(filePath + '/' + fileName).replace(/\\/gm, '\\\\'),
                header: header
            }
        );
        
        try {
            await csvWriter.writeRecords(records);       // returns a promise
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

module.exports = FileManager;
