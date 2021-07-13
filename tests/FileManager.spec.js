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
        let filePath, fileName, header, records;
        beforeEach(() => {
            filePath = 'C:\\Users\\brand\\Projects\\test-script-inventory\\tests\\output\\';
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
            const result = await FileManager.printCSV(filePath, fileName, header, records);

            // Assert
            assert.isTrue(result);
        });

        it('should throw an error when record includes an empty object', async () => {
            // Init
            records = [{}];
            let observedError = undefined;

            // Act
            try {
                await FileManager.printCSV(filePath, fileName, header, records);
            } catch(error) {
                observedError = error;
            }

            // Assert
            assert.isDefined(observedError);
            assert.equal(observedError.message, 'No empty objects are accepted as a record');
        });

        [
            {path: undefined, fileName: undefined}, 
            {path: '', fileName: undefined}, 
            {path: null, fileName: ''}, 
            {path: undefined, fileName: 'testString'}, 
            {path: 'validPath', fileName: undefined},
        ].forEach(parameters => {
            it(`should throw an error when parameters are not valid: ${JSON.stringify(parameters)}`, async () => {
                //init
                let observedError = undefined;
    
                // Act
                try {
                    await FileManager.printCSV(parameters.path, parameters.fileName, header, records);
                } catch(error) {
                    observedError = error;
                }
    
                // Assert
                assert.isDefined(observedError);
                assert.equal(observedError.message, 'Empty parameters (path/filename) not accepted');
            });
            
        });

        it('should throw an error when header includes an empty object', async () => {
            // Init
            header = [{}];
            let observedError = undefined;

            // Act
            try {
                await FileManager.printCSV(filePath, fileName, header, records);
            } catch(error) {
                observedError = error;
            }

            // Assert
            assert.isDefined(observedError);
            assert.equal(observedError.message, 'No empty objects are accepted as a header');
        });

        //header validation test for id/title
        [ 
            [{id: '', title: undefined}], 
            [{id: null, title: ''}], 
            [{id: undefined, title: 'testTitle'}], 
            [{id: 'testId', title: undefined}],
        ].forEach(headerParameters => {
            it(`should throw an error when parameters are not valid: ${JSON.stringify(headerParameters)}`, async () => {
                //init
                let observedError = undefined;
    
                // Act
                try {
                    await FileManager.printCSV(filePath, fileName, headerParameters, records);
                } catch(error) {
                    observedError = error;
                }
    
                // Assert
                assert.isDefined(observedError);
                assert.equal(observedError.message, 'Empty header parameters(id/title) not accepted');
            });
            
        });

    });
});
