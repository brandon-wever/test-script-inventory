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
        
        // Validation
        // TODO: Validation for filePath, fileName, header, and records exist
        if(!filePath || !fileName){
            throw new Error('Empty parameters (path/filename) not accepted');
        }
        if (_.find(header, (header) => JSON.stringify(header) === JSON.stringify({}))) {
            throw new Error('No empty objects are accepted as a header');
        }
        if (process.env.NODE_ENV === 'test') {
            filePath = path.resolve(__dirname + '/../../tests/output/');
        }
        // TODO: Update package.json to handle undefined directory
        
        // TODO: Validation on record, every element has valid header ids

        // Throws an error if a record has an empty object
        if (_.find(records, (record) => JSON.stringify(record) === JSON.stringify({}))) {
            throw new Error('No empty objects are accepted as a record');
        }
        // TODO: Validation on header, every element should have some id and title
        // if() {
        //     throw new Error('Empty header parameters(id/title) not accepted');
        // }
        for (let i = 0; i < header.length; i++) {
            if (!header[i].id) {
                throw new Error('Empty header parameters(id/title) not accepted');
            }
            if (!header[i].title) {
                throw new Error('Empty header parameters(id/title) not accepted');
            }
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
