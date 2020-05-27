import api from '../common/api'

const UserService = {
    getUser(data){
        return api.get(`/users/${data.id}`)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })
    },
    
    editUser(data){
        return api.put(`/users/${data.id}`,data)
            .then(response => response.data)
            .catch(error =>{ console.log(error) })  
    },

}
export default UserService;