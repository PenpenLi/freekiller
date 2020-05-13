
class WaitSecond
{
    init(config)
    {
    	this.curTime = 0;
    	this.config = config;
    }

    gennerUpdate(dt)
    {
    	this.curTime += dt;

    	return this.curTime>=this.config.second;
    }
}

module.exports = WaitSecond;