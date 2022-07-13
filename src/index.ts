

import App from '@/app';

const app = new App();
app.init()
    .then(() => {
        app.listen();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });