//	初始化
import { requestData } from './request';
import { $tree, height, width } from './origin';
import { mainData } from './cacheData';
import { drawArrow, drawMain, drawNode, drawPath, drawTex } from './draw';
import { arrowClick, nodeClick } from './event';

const init = async (requestId, { isFragmentChildren, fragmentMiddle }) => {
	const data = await requestData(requestId, { isFragmentChildren, fragmentMiddle });
	console.log('%c 请求结果为', 'color:green', data);
	//	赋值数据
	mainData.setData(data, requestId);
	//	转数据结构
	const renderData = mainData.transformData();
	console.log('%c 转为数据', 'color:blue', renderData);

	//给这个集群布局的数据:
	const root = d3.hierarchy(renderData, function (d){
		return d.children;
	});
	(
		//	创建一个新的集群(系统树图)布局.
		d3.cluster()
		// 100是右边的余量
			.size([height, width - 100])
	)(root);
	//	销毁实例，我这样肯定不对，但是能用
	$tree.innerHTML = '';

	const svg = drawMain($tree, width, height);

	drawPath(svg, root);
	drawNode(svg, root, nodeClick);
	drawTex(svg, root);
	drawArrow(svg, root, arrowClick);
};

export {
	init,
};
