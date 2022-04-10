import '../css/index.css';
import { init } from './init';

(async (isRoot) => {
	if (isRoot) {
		//	从根结点开始
		await init('root', { isFragmentChildren: true });
	} else {
		//	从 cc 节点开始
		await init('cc', { fragmentMiddle: true });
	}

})(false);
