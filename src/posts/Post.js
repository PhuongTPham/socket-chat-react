import React from 'react'
import { connect } from 'react-redux'
import { getPosts } from './action'

class GetPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.props.getPosts({})
    }
    componentDidUpdate(prevProps){
        if(prevProps.data != this.props.data) {
            this.setState({
              data: this.props.data
            })
        }
    }

    render(){
        return(
            <div>
                {
                    this.props.getPostsSaga
                }
                
            </div>
        )
    }
}