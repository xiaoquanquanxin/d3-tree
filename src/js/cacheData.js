//	缓存数据
const cacheData = () => {
	const dataMap = new Map();
	return {
		setData(requestData){
			for (const item of requestData) {
				dataMap.set(item.id, item);
			}
		},
		getDataSize(){
			return dataMap.size;
		},
		transformData(){
			//	递归找完整个树
			const recursive = (node) => {
				//	没有子节点
				if (!node.hasChildren) {
					return;
				}
				//	没有更多数据
				if (!this.getDataSize()) {
					return;
				}
				console.log('node.children', node.id, node.children);
				//	子节点列表
				node.children = node.children || [];
				//	遍历整个map
				for (const [key, item] of _dataMap) {
					const { parentId } = item;
					if (node.id === parentId) {
						//	属于 node 的 children，拷贝一份
						node.children.push(Object.assign({ ...item }));
						//	递归这个节点
						recursive(item);
						//	删除已经使用过的
						_dataMap.delete(key);
					}
				}
			};
//			console.log('%c transformData', 'color:red', dataMap);
			//	拷贝一份 dataMap，为了防止污染数据
			const _dataMap = new Map([...dataMap]);
			//	根结点，不一定存在，如果你查找的是 cc 节点
			let rootNode;
			//	先找根结点
			for (const [key, item] of _dataMap) {
				const { hasParent } = item;
				if (!hasParent) {
					//	是根结点，拷贝一份
					rootNode = Object.assign({ ...item });
					//	删除已经使用过的
					_dataMap.delete(key);
				}
			}
			//	如果有根结点，好说
			if (rootNode) {
				recursive(rootNode);
			} else {
				//	没有根结点，说明是搜索了一个 cc，那么，我们的目的就是，找到 【当前数据片段】 的根结点
				//	e.g.如果你查的是 cc 那么根结点当然就是 cc 因为你最开始只有这一个节点的数据
				//	然后，如果你点击子节点箭头，那还是 cc 作为根结点
				//	然后，如果你点击的是父节点箭头，那么 a 节点是根结点

				//	如果不明白，说明你没有看 readme

				//	获取 root node
				const getRootNode = (map) => {
					//	随便取一个
					let value = map.entries().next().value[1];
					console.log(value.parentId);
					//	递归到没有 parentId 不存在于已经请求到到 dataMap 数据中，说明它是 【当前数据片段】 的根结点
					while (map.has(value.parentId)) {
						value = map.get(parentId);
					}
					return value;
				};
				rootNode = getRootNode(_dataMap);

				//	别忘了再递归树
				recursive(rootNode);
			}
			//	我们返回的一定是根结点
			return rootNode;
		},
	};
};
const mainData = cacheData();
export {
	mainData,
};
