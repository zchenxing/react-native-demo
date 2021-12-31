import axios, { AxiosRequestConfig } from "axios";
import myToken from './token';
import { isIOS } from "../config/contant";

// const testBaseURL = `${isIOS ? 'https' : 'http'}://intelink.coolhei.com/api`
const testBaseURL = 'http://154.17.3.8:9003'

/**
 http://intelink.coolhei.com/api
 本地需要加一下hosts
 154.17.3.8:9003 intelink.coolhei.com
 */



const server = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? testBaseURL : '154.17.3.8/api',
    timeout: 100000,
})

/**
 * 请求头预处理
 * @param  {} {config} AxiosRequestConfig
 */
const requestHeaders = ({ config }: any) => {
    // 1.时间戳
    config.headers.timestamp = new Date().getTime()
    config.headers['x-druid-authentication'] = myToken.token
}

server.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        requestHeaders({ config })
        console.log('url----', `${config.baseURL}${config.url}`);
        // @ts-ignore
        console.log('x-druid-authentication- ----', config.headers['x-druid-authentication']);
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default server
