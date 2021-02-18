'use strict';

const Controller = require('../controller');

class ConfigController extends Controller {
    constructor(config, { versionService }) {
        super(config);
        this.versionService = versionService;
        this.uiConfig = {
            ...config.ui,
            version: config.version,
        };
        this.get('/', this.getUIConfig);
    }

    async getUIConfig(req, res) {
        const config = this.uiConfig;
        if (this.versionService) {
            const versionInfo = this.versionService.getVersionInfo();
            res.json({ ...config, versionInfo });
        } else {
            res.json(config);
        }
    }
}

module.exports = ConfigController;
