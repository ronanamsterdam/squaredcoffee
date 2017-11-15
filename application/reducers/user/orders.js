import appActions from '../../statics/actions';

export const ordersInitialState = {
    byId:           {},
    ids:            [],
    selected:       null
}

const byId = (state = ordersInitialState.byId, action) => {
    switch(action.type) {
        case appActions.GOT_USER_ORDERS:
            return action.orders.reduce((acc,order) => {
                return {
                    ...acc,
                    [order.id]: order
                }
            },{})
        case appActions.GOT_NEW_ORDER_PLACED:
            return {
                ...state,
                [action.order.id]: action.order
            }

        default:
            return state;
    }
}

export default orders = (state = ordersInitialState, action) => {
    switch(action.type) {
        case appActions.SELECT_ORDER:
            return {
                ...state,
                selected: {
                    ...state.byId[action.id]
                }
            }

        case appActions.GOT_USER_ORDERS:
        case appActions.GOT_NEW_ORDER_PLACED:
            const newByIdState = byId(state.byId, action);
            return {
                ...state,
                byId:           newByIdState,
                ids:            Object.keys(newByIdState)
            }
        default:
            return state;
    }
}