import { actionType } from '../../utils/constant';

const userAction = {
    loginSuccessAction: (data) => ({
        type: actionType.LOGIN_SUCCESS,
        data: data
    }),

    logoutSuccessAction: () => ({
        type: actionType.LOGOUT_SUCCESS,
    })
}

export default userAction;