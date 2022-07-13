


import * as confFile from '../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = confFile[env];

config.port = 3000;
export default config;