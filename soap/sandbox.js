
const users = require('../logic/users')

const getUser = async() =>{

    const user = await users.getUser("3")
    console.log(JSON.stringify(user))
}

getUser()