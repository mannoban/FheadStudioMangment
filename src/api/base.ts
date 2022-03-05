// 接口地址

interface Base {
    baseUrl: string,
    mockUrl: string,
    login: string,
    register: string
}


const base: Base = {
    baseUrl: "http://localhost:5000",
    mockUrl: 'http://127.0.0.1:8080',
    login: "/api/users/login",
    register: "/api/users/register"
}

export default base;