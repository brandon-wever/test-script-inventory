const createCsvWriter = require('csv-writer').createObjectCsvWriter; //testing a csv write

// Singleton
const app = {
    init: () => {
        return true;
    },
    notInit: () => {
        return false;
    }
};

module.exports = app;
