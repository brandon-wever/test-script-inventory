const fs = require('fs');
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
    printCSV: async (path, fileName, header, records) => {
        // Validation
        // TODO: Validation for path, fileName, header, and records exist
        // TODO: Validation on header, every element should have some id and title
        // TODO: Validation on record, every element has valid header ids
        // Throws an error if a record has an empty object
        if (_.find(records, (record) => JSON.stringify(record) === JSON.stringify({}))) {
            throw new Error('No empty objects are accepted as a record');
        }

        const csvWriter = createCsvWriter(
            {
                path: path + fileName,
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
