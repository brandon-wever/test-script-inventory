const { assert, expect } = require('chai');
const FileManager = require('../src/classes/FIleManager');
const path = require('path');
const fs = require('fs');
const _ = require('underscore');
const moment = require('moment');

function generateFileName(testName) {
    return `${testName}-${moment().unix()}.csv`;
}

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

        it('should throw error when filename is empty', async () => {
            // Init
            let observedNullError, observedEmptyError;

            // Act
            try {
                await FileManager.printCSV('path', null, [], []);
            } catch (error) {
                observedNullError = error;
            }

            try {
                await FileManager.printCSV('path', "", [], []);
            } catch (error) {
                observedEmptyError = error;
            }
            
            // Assert
            assert.isDefined(observedNullError, 'Expected value should have been observed when fileName is null');
            assert.isDefined(observedEmptyError, 'Expected value should have been observed when fileName is ""');
        });

        it('should throw error when filePath is empty', async () => {
            // Init
            let observedNullError, observedEmptyError;

            // Act
            try {
                await FileManager.printCSV(null, 'someFileName', [], []);
            } catch (error) {
                observedNullError = error;
            }

            try {
                await FileManager.printCSV('', 'someFileName', [], []);
            } catch (error) {
                observedEmptyError = error;
            }
            
            // Assert
            assert.isDefined(observedNullError, 'Expected value should have been observed when fileName is null');
            assert.isDefined(observedEmptyError, 'Expected value should have been observed when fileName is ""');
        });

        it('should throw error when header does not include id', async () => {
            // Init
            const header = [{id: 1, title: 'test1'}, {title: 'test'}];
            let observedError;

            // Act
            try {
                await FileManager.printCSV('path', generateFileName('this-should-not-be-here'), header, []);
            } catch (error) {
                observedError = error;
            }

            // Assert
            assert.isDefined(observedError);
        });

        it('should throw error when header does not include title', async () => {
            // Init
            const header = [{id: 1, title: 'test1'}, {id: 2}];
            let observedError;
    
            // Act
            try {
                await FileManager.printCSV('path', generateFileName('this-should-not-be-here'), header, []);
            } catch (error) {
                observedError = error;
            }
    
            // Assert
            assert.isDefined(observedError);
        });

        it('should throw error when a record includes a property that does not exist in header', async () => {
            // Init
            const headers = [{id: 'test1', title: 'ANYTHING'}, {id: 'test2', title: 'ANYTHING'}];
            const records = [{test1: '', test2: ''}, {test1: 'some value', test3: 'does not exist in list'}];
            let observedError;
    
            // Act
            try {
                await FileManager.printCSV('path', generateFileName('this-should-not-be-here'), headers, records);
            } catch (error) {
                observedError = error;
            }
    
            // Assert
            assert.isDefined(observedError);
        });
    });
});
