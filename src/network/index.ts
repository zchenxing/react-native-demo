import axios from 'axios'

/**
 http://intelink.coolhei.com/api
 本地需要加一下hosts
 154.17.3.8 intelink.coolhei.com
 */

const network = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '154.17.3.8/api' : '154.17.3.8/api',
    timeout: 100000
})



export default network
