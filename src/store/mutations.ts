// mutations所有能够操作state的方法(必须是同步的)
export default {
    SET_TOKEN(state: any, value: String) {
        state.token = value;
    },
    OUT_LOGIN(state: any) {
        state.token = '';
    },
    GET_USER(state: any, value: String) {
        state.userId = value
    },
    GET_USER_ROLE(state: any, value: string) {
        state.userRole = value;
    }
}