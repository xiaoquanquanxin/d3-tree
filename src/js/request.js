import axios from 'axios';

const requestData = async (id, { isFragmentChildren, fragmentMiddle }) => {
	const result = await axios.get(
		isFragmentChildren ?
			`data/fragmentChildren/${id}.json` :
			`data/fragmentMiddle/${id}.json`,
	);
	return result.data;
};

export {
	requestData,
};
