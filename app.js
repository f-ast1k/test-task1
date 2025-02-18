import express from 'express';
import { routes } from './src/routes/index.js';
import { getConfig } from './src/config/config.js';
import { testConnectToBd, umzug } from './src/config/db.js';

const app = express();

app.use(express.json());
app.use(routes);

async function startApp() {
    try {
        await testConnectToBd();
        await umzug.up();
        if (getConfig('node_env') === 'dev') {
        }
        app.listen(getConfig('port'), () => {
            console.log(`Server running on port ${getConfig('port')}`);
        });
    } catch (error) {
        console.error(`Error start app: ${error}`);
        process.exit(1);
    }
}

startApp();
