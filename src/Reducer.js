const uuidv4 = require('uuid/v4')
/*
    @prop id: number
    @prop name: string, @prop socketId,=
    @param(object):name, socketId
*/ 
const createUser = ({name ="", socketId= null} = {})=>({
    id: uuidv4(),
    name,
    socketId
})
/*
    @prop id: number, @prop date in time 24h, @prop message: string, @prop sender: string
    @param(object):message, sender
*/
const createMessage= ({message="", sender="" } = { })=>({
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
})
/*
    @prop id: number, @prop name: string, @prop message: array.string, @prop user: array.string 
    @param(object):name, message, user
*/
const createChat =({messages=[], name="Uyen", users=[], isCommuntiy = false} = {}) =>({
    id: uuidv4(),
    name : isCommuntiy ? name: createChatNameFromUsers(users) ,
    messages,
    users,
    typingUsers:[],
    isCommuntiy
})

/* 
    @prop user {Array.string}
    @prop exludeUser (string) user exclude from list
    @return {string} users names concatenated by a '&' or "Empty Chat" if no users
*/
const createChatNameFromUsers = (users, excludeUsers ="") => {
    return users.filter( u => u !== excludeUsers).join(' & ') || "Uyen"
}
/*
    @param get Date:s
    return a string present in 24h as "11:30" or"19:30
 */
const getTime = (date) =>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

// const addMessageToChat = (chat, message) =>{
//     return [...chat.messages, message]
// }

module.exports={
    createUser,
    createMessage,
    createChat,
    createChatNameFromUsers
}