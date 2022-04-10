/**
 * 将SVG对象追加到页面主体
 * @return {Object} svg
 * */
const drawMain = ($tree, width, height) => {
	return d3.select($tree)
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(40,0)');
};

//	画路线
const drawPath = (svg, root) => {
	svg.selectAll('path')
		.data(root.descendants().slice(1))
		.enter()
		.append('path')
		.attr('d', function (d){
			return 'M' + d.y + ',' + d.x
				//	50和150是拐点坐标，使用它可以改变链接的形状
				+ 'C' + (d.parent.y + 50) + ',' + d.x
				+ ' ' + (d.parent.y + 150) + ',' + d.parent.x
				+ ' ' + d.parent.y + ',' + d.parent.x;
		})
		.style('fill', 'none')
		.attr('stroke', '#ffff00');
};

//	画节点
const drawNode = (svg, root, nodeClick) => {
	// 为每个节点添加一个div。
	svg.selectAll('g')
		.data(root.descendants())
		.enter()
		.append('g')
		.attr('transform', function (d){
			return 'translate(' + d.y + ',' + d.x + ')';
		})
		.append('rect')
		//	矩形块，固定大小，建议这样，要不麻烦，这里固定 100 长 50 高
		.attr('x', -50)
		.attr('y', -25)
		.attr('width', 100)
		.attr('height', 50)
		.style('fill', 'rgba(255,0,5,0.2)')
		.attr('stroke', 'rgba(0,0,5,0.2)')
		.style('stroke-width', 2)
		.on('click', nodeClick);
};

//	箭头
const drawArrow = (svg, root, arrowClick) => {
	//	复制数据长度，因为你要画左右2个箭头
	const descendants = (root.descendants().map(item => {
		return [item, item];
	})).flat();
	svg.selectAll('polygon')
		.data(descendants)
		.enter()
		.append('polygon')
		.attr('transform', function (d){
			return 'translate(' + d.y + ',' + d.x + ')';
		})
		.attr('points', function ({ data }, index){
			const { hasChildren, hasParent } = data;
			if (index&1) {
				//	有子节点
				if (hasChildren) {
					return '40,0 33,5 33,-5';
				}
				return '0,0 0,0 0,0';
			} else {
				//	有父节点
				if (hasParent) {
					return '-40,0 -33,5 -33,-5';
				}
				return '0,0 0,0 0,0';
			}
		})
		.attr('stroke', 'black')
		.style('stroke-width', 2)
		.style('cursor', 'pointer')
		.attr('data-set', function ({ data }, index){
			if (index&1) {
				//	右侧按钮
				return 'isRight' ;
			}
			//	左侧按钮
			return 'isLeft' ;
		})
		.on('click', arrowClick);
};
//	文本
const drawTex = (svg, root) => {
	svg.selectAll('text')
		.data(root.descendants())
		.enter()
		.append('text')
		.attr('transform', function (d){
			return 'translate(' + d.y + ',' + d.x + ')';
		})
		.attr('x', -30)
		.style('fill', 'rgb(0,0,255)')
		.text(function ({ data }){
			return data.name;
		});
};

export {
	drawMain,
	drawPath,
	drawNode,
	drawArrow,
	drawTex,
};

