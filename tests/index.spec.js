const { assert } = require('chai');
const app = require('../src/index');

describe('index.js', () => {
    
    describe('init', () => {
        it('should return true', () => {
            // Initialize

            // Act (call method you are testing)
            const result = app.init();

            // Assert that code is working properly
            assert.isTrue(result);
        });
    });

    describe('notInit', () => {
        it('should return false', () => {
            // Initialize

            // Act (call method you are testing)
            const result = app.notInit();

            // Assert that code is working properly
            assert.isFalse(result);
        });
    });
});
