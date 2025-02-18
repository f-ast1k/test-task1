import { Sequelize } from 'sequelize';
import { getConfig } from './config.js';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: getConfig('db:host'),
    port: getConfig('db:port') || 5432,
    username: getConfig('db:username'),
    password: getConfig('db:password'),
    database: getConfig('db:name'),
    logging:
        getConfig('node_env') == 'dev'
            ? (msg) => console.log(`Sequelize: ${msg}`)
            : false,
});

const umzug = new Umzug({
    migrations: { glob: ['../migrations/*.mjs', { cwd: __dirname }] },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

async function testConnectToBd() {
    try {
        await sequelize.authenticate();
        if (getConfig('node_env') === 'dev')
            console.log('Connect to the database success'),
                await sequelize.sync({ alter: true, force: true });
        return sequelize;
    } catch (error) {
        console.log(`Unable to connect to the database: ${error}`);
        throw error;
    }
}

export { sequelize, testConnectToBd, umzug };
