//	点击事件
import { init } from './init';

const nodeClick = (event) => {
	return;
};

//	点击箭头
const arrowClick = async (event, { data }, index) => {
	switch (event.target.dataset.set) {
		//	请求子节点
		case 'isRight':
			//	这里，都是 fragmentChildren 里的数据了
			await init(data.id, { isFragmentChildren: true });
			break;
		case  'isLeft':
			await init(data.parentId, { fragmentMiddle: true });
			break;
	}
};

export {
	nodeClick,
	arrowClick,
};
