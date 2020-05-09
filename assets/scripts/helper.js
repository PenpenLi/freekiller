
class Helper
{
	moveNodeTo(node, newParent){
		var world = node.convertToWorldSpaceAR(cc.v2(0,0));
		node.parent = newParent;
		node.position = newParent.convertToNodeSpaceAR(world);
	}
}

window.helper = new Helper();