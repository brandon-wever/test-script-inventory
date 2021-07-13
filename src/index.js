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

const csvWriter = createCsvWriter({
    path: 'C:\\Users\\brand\\Projects\\test-script-inventory\\tests\\assets\\csv-print-test.csv',
    header: [
        {id: 'test', title: 'TESTNAME'},
        {id: 'tags', title: 'TAGS'},
        {id: 'testFileName', title: 'TESTFILENAME'}
    ]
});

const records = [
    {test: 'testing this', tags: 'relates to x', testFileName: 'this test is in file 1'},
    {test: 'testing that', tags: 'relates to y', testFileName: 'this test is in file 2'},
    {test: 'testing blah', tags: 'relates to z', testFileName: 'this test is in file 3'}
];

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

module.exports = app;
