
class MovableEnermyGenner
{
    init(config)
    {
        this.config = config;
    }

    gennerUpdate(dt)
    {
        cc.log('create enermy', this.config.names);
    }
}

module.exports = MovableEnermyGenner;