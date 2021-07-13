const { assert, expect } = require('chai');
const FileManager = require('../src/classes/FIleManager');
const path = require('path');
const fs = require('fs');
const _ = require('underscore');

describe('FileManager.js', () => {
    
    describe('readFile', () => {
        let testFiles = [];
        const assetsDirectory = path.resolve(__dirname + '/assets/');

        beforeEach(() => {
            testFiles = fs.readdirSync(assetsDirectory).map((fileName) => path.resolve(`${__dirname}/assets/${fileName}`));
        });
        
        it('should read contents of all assets', () => {
            // Initialize
            
            _.each(testFiles, (fileName) => {
                // Act
                const result = FileManager.readFile(fileName);

                // Assert
                assert.isString(result);
            });
        });
    });

    describe.only('printCSV', () => {
        let path, fileName, header, records;
        beforeEach(() => {
            path = 'C:\\Users\\brand\\Projects\\test-script-inventory\\tests\\assets\\';
            fileName = 'csv-print-test.csv';
            header = [
                {id: 'test', title: 'TESTNAME'},
                {id: 'tags', title: 'TAGS'},
                {id: 'testFileName', title: 'TESTFILENAME'}
            ];
            records = [
                {test: 'testing this', tags: 'relates to x', testFileName: 'this test is in file 1'},
                {test: 'testing that', tags: 'relates to y', testFileName: 'this test is in file 2'},
                {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'},
                {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'},
                {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'},
                {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'},
                {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'},
                {tags: 'relates to z', testFileName: 'this test is in file 3'}
            ];
        });

        it('should return true', async () => {
            // Init

            // Act
            const result = await FileManager.printCSV(path, fileName, header, records);

            // Assert
            assert.isTrue(result);
        });

        it('should throw an error when record includes an empty object', async () => {
            // Init
            records = [{}];
            let observedError = undefined;

            // Act
            try {
                await FileManager.printCSV(path, fileName, header, records);
            } catch(error) {
                observedError = error;
            }

            // Assert
            assert.isDefined(observedError);
            assert.equal(observedError.message, 'No empty objects are accepted as a record');
        });
    });
});
