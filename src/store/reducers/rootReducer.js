import { actionType } from '../../utils/constant';

const initialState = {
    isLoggedIn: false,
    token: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data
            }
        case actionType.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        default:
            return state;
    }
}

export default rootReducer;