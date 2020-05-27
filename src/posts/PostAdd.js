import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import { addPostsRequest, GET_POSTS }from './action'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

class PostAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:"",
            title:"",
            body:""
        }
    };

    OnchangeInput = (e) =>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }
    hanldeAddPost = (e) =>{
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
        e.preventDefault();
        let data = {userId: this.state.userId, title: this.state.title, body: this.state.body}
        this.props.addPostsRequest(data);
        
        
    }
    toggle = (e) => {
        e.preventDefault()
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      }

    componentDidMount(){
        this.props.getPosts()
    }
    
    render(){
        return(
            <React.Fragment>
                <Button color="danger" onClick={this.toggle}>Add</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>
                    New Post
                </ModalHeader>
                <ModalBody>
                    <form action="">
                    <div className="form-group">
                        <label htmlFor="name">userId</label>
                        <input type="text" className="form-control" name="userId" placeholder="id" value={this.state.userId} onChange={this.OnchangeInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="des">Title</label>
                        <textarea type="text" className="form-control" name="title" placeholder="title" onChange={this.OnchangeInput} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="des">Body</label>
                        <textarea type="text" className="form-control" name="body" placeholder="body" onChange={this.OnchangeInput} value={this.state.body} />
                    </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.hanldeAddPost}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
               
            </React.Fragment>
        )
    }
}
PostAdd.propTypes={
    addPostsRequest: PropTypes.func,
    isOpen:  PropTypes.bool,
    autoFocus: PropTypes.bool,
    centered: PropTypes.bool,
    size: PropTypes.string,
    toggle:  PropTypes.func,
    role: PropTypes.string,
    labelledBy: PropTypes.string,
    keyboard: PropTypes.bool,
    backdrop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['static'])
    ]),
  scrollable: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  innerRef: PropTypes.object,
  unmountOnClose: PropTypes.bool
}
const mapStateToProps = state => {
    return {
    }
  }
  const mapDispatchToProps = dispatch => ({
    addPostsRequest : data => (dispatch(addPostsRequest(data))),
    getPosts: ( ) => (dispatch({
        type: GET_POSTS,
    }))
  })
  export default connect(mapStateToProps, mapDispatchToProps)(PostAdd)