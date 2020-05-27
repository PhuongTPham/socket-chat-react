import api from '../common/api'

const PostService = {
    getPosts(){
        return api.get('/posts')
            .then(response => response.data)
            .catch(error =>{ console.log(error) })
    },
    getPost(id){
        return api.get(`/posts/${id}`)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })
    },
    addPost(data){
        return api.post('/posts', data)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })
    },
    editPost(data){
        return api.put(`/posts/${data.id}`,data)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })  
    },
    deletePost(id){
        return api.delete(`/posts/${id}`)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })
    },


}
export default PostService;