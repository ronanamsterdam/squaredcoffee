import { APP_TEST_ACTION, APP_TEST_ACTION_DVA, NONE } from '../statics/actions';

const initialState = [{
	type: NONE,
	id: 0
}];

export default function testReducerDva(state = initialState, action) {
	switch (action.type) {
		case APP_TEST_ACTION:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				type: action.type,
			}, ...state];
		default:
			return state;
	}
}