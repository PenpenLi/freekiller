
class SequenceGenner
{
    init(config)
    {
        this.config = config;
        this.runningIndex = 0;
    }

    // 返回true代表运行完成
    // 返回false代表还需要继续运行
    gennerUpdate(dt)
    {
        if (!this.runningGenner) {
            this.runningGenner = this.createGenner();
        }

        if (!this.runningGenner) {
            return true;
        }

        var res = this.runningGenner.gennerUpdate(dt);

        if (res) {
            this.runningGenner.exit();
            this.runningGenner = null;
        }

        return false;
    }

    createGenner()
    {
        if (this.runningIndex >= this.config.length) {
            return null;
        }

        var genconfig = this.config[this.runningIndex];
        this.runningIndex++;

        var gen = helper.create(genconfig.type);
        gen.init(genconfig.config);
        return gen;
    }
}

module.exports = SequenceGenner;