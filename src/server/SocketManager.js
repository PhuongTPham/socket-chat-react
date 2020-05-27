
const io = require('./index.js').io

const{VERIFY_USER, USER_CONNECTED,
     USER_DISCONNECTED,LOGOUT, 
     MESSAGE_RECEIVED, MESSAGE_SENT,
     TYPING,COMMUNITY_CHAT,PRIVATE_MESSAGE, NEW_CHAT_USER} =require('../Events')

const{createUser, createMessage,createChat} = require('../Reducer')

let connectedUsers= { }

let communityChat = createChat({ isCommuntiy: true })

// let chats = {
//     [communityChat.id]:communityChat
// }
module.exports = function(socket){

    console.log("Socket ID: "+ socket.id)

    let sendMessageToChatFromUser;

	let sendTypingFromUser;

    //Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname, socketId:socket.id})})
		}
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		user.socketId = socket.id
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user

		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)
		
		io.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);
	})
	
	//User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})


	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})
	
	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

	socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
		if(reciever in connectedUsers){
			const recieverSocket = connectedUsers[reciever].socketId
			if( activeChat === null || activeChat.id === communityChat.id ){
				const newChat = createChat({name:`${reciever}&${sender}`, users:[reciever, sender]})
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
				socket.emit(PRIVATE_MESSAGE, newChat)
			}else{
				if(reciever in activeChat.users){
					activeChat.users.filter(user => user in connectedUsers)
									.map(user => connectedUsers[user])
									.map(user => {
										socket.to(user.socketId).emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever })
									})
									socket.emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever})
				}
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat)
			}
		}
	})

}

function sendTypingToChat(user){
    return(chatId,isTyping )=>{
        io.emit(`${TYPING}-${chatId}`, {user, isTyping})
    }
}

/*

 */
function sendMessageToChat(sender){
    return (chatId, message)=>{
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}))
    }
}


/*
    add user to list pass in
    @param userList(object)
    @param user(User) add to list, @return userList(object) with key value pairs of user
*/
function addUser(userList, user){
    let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}
/*
    remove user from list 
    @param userList(object)
    @param user(User) add to list, @return userList(object) with key value pairs of user
*/
function removeUser(userList,username){
    let newList = Object.assign({},userList)
    delete newList[username]
    return newList
}
/*
    check if useris in list pass in
    @param userList(object)
    @param user(User) add to list, @return userList(object) with key value pairs of user
*/
function isUser(userList,username){
    return username in userList
}