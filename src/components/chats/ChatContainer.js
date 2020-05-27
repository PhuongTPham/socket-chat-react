import React, { Component } from 'react'
import SideBar from '../sidebar/SideBar'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import { values, difference, differenceBy } from 'lodash'
import{
    MESSAGE_SENT,
    TYPING,USER_CONNECTED, USER_DISCONNECTED,
    COMMUNITY_CHAT,
    MESSAGE_RECEIVED, PRIVATE_MESSAGE, NEW_CHAT_USER
}from '../../Events'

export default class ChatContainer extends Component{
    
    constructor(props){
        super(props);
        this.state={
            users:[],
            chats:[],
            activeChat: null 
        }
    }
    componentDidMount(){
        const { socket }=this.props
        this.initSocket(socket)
    }
    componentWillUnmount() {
		const { socket } = this.props
		socket.off(PRIVATE_MESSAGE)
		socket.off(USER_CONNECTED)
		socket.off(USER_DISCONNECTED)
		socket.off(NEW_CHAT_USER)
	}
	initSocket(){
		const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.resetChat) // socket.on: listen data, socket.emit: phaft data
        socket.on(PRIVATE_MESSAGE, this.addChat)
        socket.on('connect', ()=>{
            socket.emit(COMMUNITY_CHAT, this.resetChat)
        })
        socket.on(USER_CONNECTED, (users) =>{
            this.setState({users: values(users)})
        })
        socket.on(USER_DISCONNECTED, (users)=>{
            const removeUsers = differenceBy(this.state.users, values(users), 'id')
            this.removeUsersFromChat(removeUsers)
            this.setState({users: values(users)})
        })
        socket.on(NEW_CHAT_USER, this.addUserToChat)
    }
    sendOpenPrivateMessage =(reciever) =>{
        const { socket, user } = this.props
        const { activeChat } = this.state
        socket.emit(PRIVATE_MESSAGE, {reciever, sender: user.name, activeChat})
    }

    resetChat=(chat)=>{
        return this.addChat(chat, true)
    }

    addChat=(chat,reset = false )=>{
        const { socket }=this.props
        const { chats }= this.state

        const newChats = reset ? [chat] : [...chats,chat]
        this.setState({chats:newChats, activeChat: reset ? chat : this.state.activeChat})

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(typingEvent, this.updateTypingInChat(chat.id))
        socket.on(messageEvent, this.addMessageToChat(chat.id))
        

    }
    
    addUserToChat = ({chatId, newUser})=>{
        const { chats } = this.state
        const newChats = chats.map((chat)=>{
            if(chat.id === chatId){
                return Object.assign({}, chat, { users: [...chat.users,newUser]})
            }
            return chat
        })
        this.setState({chat:newChats})
    }
    removeUsersFromChat = removeUsers =>{
        const { chats } = this.state
        const newChats = chats.map((chat)=>{
            let newUsers = difference( chat.users, removeUsers.map(u=>u.name) )
                return Object.assign({}, chat, {users: newUsers} )
        })
        this.setState({chat:newChats})
    }
    updateTypingInChat = (chatId) =>{
        return({isTyping, user}) =>{
            if(user !== this.props.user.name){
                const { chats } = this.state

                let newChats = chats.map((chat)=>{
                    if(chat.id === chatId){
                        if(isTyping && !chat.typingUsers.includes(user)){
                            chat.typingUsers.push(user)
                        }else if(!isTyping && chat.typingUsers.includes(user)){
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat;
                })
                this.setState({chats:newChats})
            }
        }
    }

    addMessageToChat = (chatId) =>{
        return message =>{
            const { chats }=this.state
            let newChats = chats.map((chat)=>{
                if(chat.id === chatId)
                    chat.messages.push(message)
                return chat
            })
            this.setState({chats:newChats})
        }
    }

    sendMessage =( chatId,message )=>{
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, {chatId,message})
    }

    sendTyping =(chatId, isTyping)=>{
        const { socket } = this.props
        socket.emit(TYPING, {chatId,isTyping})
    }
    
    setActiveChat = (activeChat) =>{
        this.setState({activeChat})
        
    }

    render(){
        const { user, logout } = this.props
        const { chats, activeChat,users } = this.state
        
        
        return(
            <div className="container chat">
                <SideBar
                    logout={logout}
                    chats={chats}
                    user={user}
                    users={users}
                    activechat={activeChat}
                    setActiveChat={this.setActiveChat}
                    onSendPrivateMessage={this.sendOpenPrivateMessage}
                />
                <div className="chat-room-container">
                    {
                        activeChat !== null ? (
                            <div className="chat-room">
                                <ChatHeading name={activeChat.name} />
                                <Messages
                                    messages={activeChat.messages}
                                    user={user}
                                    typingUsers={activeChat.typingUsers}
                                />
                                <MessageInput
                                    sendMessage={
                                        (message)=>{
                                            this.sendMessage(activeChat.id, message)
                                        }
                                    }
                                    sendTyping={
                                        (isTyping)=>{
                                            this.sendTyping(activeChat.id, isTyping)
                                        }
                                    }
                                    />
                            </div>
                        ):
                        <div className="chat-room choose">
                            <h3>Choose a chat</h3>
                        </div>
                    }
                </div>
            </div>
        )
    }
}