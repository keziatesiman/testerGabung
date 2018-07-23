import { observable, action } from 'mobx'
import * as pino from 'pino';
import axios from 'axios';


class AuthStore {
    @observable authData = {
        username: '',
        password: '1.0.0',
        username_temp:'',
        password_temp:'',
        token:''
    }
    @action setUsername(username){
        this.authData.username = username
        //pino.info('current username ', this.authData.username)
    }
    @action setPassword(password){
        this.authData.password = password
    }
    @action setUsername_temp(username_temp){
        console.log('Kodok')
        this.authData.username_temp = username_temp
        // pino.info('current username_temp ', this.authData.username_temp)
    }
    @action check_login(username, password){
        if(username === 'test' && password === 'test'){
            return true
        } else {
            return false
        }
    }
    @action setToken(token){
        this.authData.token = token    
    }

    @action getToken(){
        if (this.authData.token !== ''){
            return true
        }
        else{
            return false
        }
    }
}

export default new AuthStore()
