const { assert } = require('chai');
const FileManager = require('../src/classes/FIleManager');
const path = require('path');

describe('FileManager.js', () => {
    
    describe('readFile', () => {
        it('should read contents of test-file.txt', () => {
            // Initialize
            let testFilePath = path.resolve(__dirname + '/assets/test-file.txt');
    
            // Act (call method you are testing)
            const result = FileManager.readFile(testFilePath);
    
            // Assert that code is working properly
            assert.equal(result, 'Some random test file that does nothing for anyone.');
        });
    });
});
