var store = {
    USER_EMAIL: "admin@test.com",
    USER_CREATED: "2020-04-08T20:15:30.594Z",
    USER_USERNAME: "admin",
    USER_FIRSTNAME: "Jack",
    USER_ID: "5e8e30e24318e94538e5fa09",
    USER_LASTNAME: "Whelan",
    USER_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGUzMGUyNDMxOGU5NDUzOGU1ZmEwOSIsImZpcnN0bmFtZSI6IkphY2siLCJsYXN0bmFtZSI6IldoZWxhbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwiY3JlYXRlZCI6IjIwMjAtMDQtMDhUMjA6MTU6MzAuNTk0WiIsImlhdCI6MTU4NzI2MDQ4MywiZXhwIjoxNTg3MjY0MDgzfQ.8IDNyo5KRVc0yrfY9S6g40H8Eum-6BvoEcig6dGxOwg"
}

export default {
    getItem: function (key) {
        return store[key] || null;
    },
    setItem: function (key, value) {
        store[key] = value.toString();
    },
    clear: function () {
        store = {};
    }
}