const fs = require('fs');

const FileManager = {
    readFile: (filepath) => {
        try {
            return fs.readFileSync(filepath, 'utf8');
        } catch(error) {
            // TODO: Log error with winston
            console.error(error);
        }

        return null;
    }
};

module.exports = FileManager;
