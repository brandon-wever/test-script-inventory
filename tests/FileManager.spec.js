const { assert } = require('chai');
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

    describe('printCSV', () => {
        it('should return true', () => {
            // Init

            // Act
            const result = FileManager.printCSV('some string');

            // Assert
            assert.isTrue(result);
        });
    });
});
