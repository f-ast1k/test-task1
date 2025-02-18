// const path = import("path")
// import * as nconf from "nconf";
import nconf from 'nconf';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nconf.argv();
nconf.env({ separator: '__', lowerCase: true, parseValues: true });

const env = process.env.NODE_ENV || 'dev';

nconf.file({ file: path.join(__dirname, `config.${env}.json`) });
if (env !== 'production') {
    nconf.file({ file: path.join(__dirname, `config.${env}.json`) });
}

nconf.defaults({
    node_env: 'dev',
    port: 3000,
    db: {
        host: 'localhost',
        port: 5432,
        name: 'db',
        user: '',
        password: '',
    },
});

function getConfig(key) {
    return nconf.get(key);
}

export { nconf, getConfig };
