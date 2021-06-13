import * as uploadKeys from "../keys/uploadKeys";

const defaultState = {
	pending: false,
	rejected: false,
	data: [],
	error: null
}

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
		case uploadKeys.UPLOAD_PENDING:
			return {
				...state,
				pending: true,
				rejected: false
			};
		case uploadKeys.UPLOAD_DONE:
			return {
				...state,
				pending: false,
				rejected: false,
				data: action.payload
			};
		case uploadKeys.UPLOAD_REJECTED:
			return {
				...state,
				pending: false,
				rejected: true,
				error: action.payload
			};
		default:
			return state;
	}
};

export default loginReducer;
