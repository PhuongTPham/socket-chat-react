import React, { Component } from 'react'
import io from 'socket.io-client'
import {
   // VERIFY_USER,
    USER_CONNECTED,
    LOGOUT
} from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
import '../style/index.scss'

export default class Layout extends Component{

    constructor(props){
        super(props);

        this.state={
            socket:null,
            user: null,
            connected: false
        };
    }
    componentWillMount(){
        this.initSocket()
    }
    /*
        Connect to and initialize socket
    */
    initSocket = ()=>{
        //console.log(socketUrl)
        const socket = io("http://localhost:3001")

        // const localData=localStorage.getItem("id")
        // socket.emit(VERIFY_USER, localData)
        socket.on('connect', ()=>{
            this.setState({connected: true})
            if(this.state.user){
                socket.emit(USER_CONNECTED, this.state.user)
                
            }
        })
        socket.on('disconnect', ()=>{
            this.setState({connected:false})
        })
        
        this.setState({socket})
    }
    /*
         set user property in state
         id: number, name: string
    */
    setUser = (user)=>{
        const { socket }=this.state
        //localStorage.setItem("id",user.id)
        socket.emit(USER_CONNECTED, user)
        this.setState({user})
    }
    /*
         set user property in state :null
    */
    logout = () =>{
        const { socket }=this.state
      // localStorage.removeItem("id")
        socket.emit(LOGOUT)
        this.setState({user:null})
    }
    render(){
        //const { title }= this.props
        const { socket,user, connected } = this.state
        return(
            <div className="container">
                <div className={`status ${connected ? 'online' : 'offline'}`}></div>
                {
                    !user ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<ChatContainer socket={socket} user={user} logout={this.logout}/>
                }
                
            </div>
        )
    }
}