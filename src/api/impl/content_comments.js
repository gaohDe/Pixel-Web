import axios from 'axios';
import { HOST_CONCIG, API_ROUTER_CONFIG, DEBUG } from '../../api/config/api-config'
import { logger } from '../../utils/logger'
import store from '../../store/'
import * as data from '../../assets/debug-data/getData'


export const getContentComments = (id ,page, okCallback, errorCallback) => {
    
    if (DEBUG) {
        setTimeout(function () {
            okCallback(data.contentcomment)
        }, 1500)
        return 
    }

    const accesstoken = store.getters.token.access_token

    var request_data = {
        access_token: accesstoken,
        count: 30,
        id: id,
        page: page
    }

    var config = {
        method: 'get',
        url: API_ROUTER_CONFIG.content_comments,
        baseURL: HOST_CONCIG.host,
        params: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios(config)
        .then(function (response) {
            logger("oauthPost-ok", 'getContentComments response succeed')
            okCallback(response.data)
        })
        .catch(function (error) {
            console.log(error);
            errorCallback(error)
        })
}