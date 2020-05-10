
class Helper
{
	constructor()
	{
		this.sound = true;
	}

	moveNodeTo(node, newParent)
	{
		var world = node.convertToWorldSpaceAR(cc.v2(0,0));
		node.parent = newParent;
		node.position = newParent.convertToNodeSpaceAR(world);
	}

	playEffect(audioClip)
	{
		this.sound && cc.audioEngine.playEffect(audioClip);
	}

	debugObject(obj)
	{
		cc.log('----------------');
		for(let k in obj)
		{
			cc.log(k, '=', obj[k]);
		}
	}
}

window.helper = new Helper();