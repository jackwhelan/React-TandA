const axios = require('axios');

test('Block attempts to register without filling in any fields', () => {
    var blocks = false;

    newUser = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    }

    axios.post('/users/register', newUser)
    .then(res => {
        if (res.status) {
            blocks = true;
        }
    })
    .then(()=>{
        expect(blocks).toBeFalsy();
    });
})