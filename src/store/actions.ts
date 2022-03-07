import { GET_USER } from "./mutations_type"

// actions提交操作给mutations(可以是同步,也可以是异步)
export default {
    // 在mutations里写的所有方法是一个对象,对象里有一个方法commit
    setToken({ commit }: any, value: String) {
        commit('SET_TOKEN', value)
    },
    outLogin({ commit }: any) {
        commit('OUT_LOGIN')
    },
    getUser({ commit }: any, value: string) {
        commit('GET_USER', value)
    }
}