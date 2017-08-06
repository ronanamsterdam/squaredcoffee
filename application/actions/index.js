import * as types from '../statics/actions';

import api from './api';
import user from './user';

const appTestAction = val => ({ type: types.APP_TEST_ACTION, val });
const appTestActionDva = val => ({ type: types.APP_TEST_ACTION_DVA, val });

const cartAdd = item => ({ type: types.CART_ADD, item });
const cartRemove = item => ({ type: types.CART_REMOVE, item });

const postCheckoutMsgIn = message => ({ type: types.WEBVIEW_CHEKOUT_MESSAGE_IN, message });
const postCheckoutMsgOut = message => ({ type: types.WEBVIEW_CHEKOUT_MESSAGE_OUT, message });

const cardNonceReceived = nonce => dispatch =>
		//nonce received checkout webview messages que
		//must be cleared
		dispatch({ type: types.WEBVIEW_CHEKOUT_CLEAN_QUE})
		&&
		dispatch({ type: types.RECEIVED_USER_CARD_NONCE, nonce });

const createNewPayment = payment => ({ type: types.PAYMENT_CREATE_NEW, payment })

const updatePayment = paymentUpdated => ({type: types.PAYMENT_UPDATE, paymentUpdated});

const placeOrder = _ => ({type: types.PLACE_ORDER});


export default {
	appTestAction,
	appTestActionDva,
	cartAdd,
	cartRemove,
	postCheckoutMsgIn,
	postCheckoutMsgOut,
	cardNonceReceived,
	createNewPayment,
	updatePayment,
	placeOrder,
	...api,
	...user
};
