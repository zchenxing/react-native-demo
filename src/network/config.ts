import { sha256 } from "js-sha256";
import { PAGE_SIZE } from "../config/contant";


class ApiConfig {

    /**
     * 生成密码
     * @param username 用户名
     * @param password 加密前的密码
     * @return {*}
     */
    generatePassword(username: string, password: string) {
        return sha256(`${username} + druid + ${password} + heifeng`)
    }

    pageToken(sort?: string) {

        if (!sort) {
            sort = 'id'
        }

        const headers: any = {}

        headers['x-result-limit'] = PAGE_SIZE

        if (sort) {
            headers['x-result-sort'] = sort
        }

        return { headers }
    }

}



const apiConfig = new ApiConfig()

export default apiConfig
