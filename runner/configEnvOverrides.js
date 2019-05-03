const os = require('os');

module.exports = (config) => {
    const override = (prop, envName, defaultValue) => {
        config[prop] = (process.env[envName] || config[prop] || defaultValue);
    }

    override('port', 'PORT');
    override('basePath', 'BASE_PATH', process.cwd());
    override('runAsUserId', 'RUN_AS_USER_ID', os.userInfo().uid);
    return config;
}
