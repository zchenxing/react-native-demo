import druidStorage from '../storage';

const STORAGE_KEY = 'x-druid-authentication'


class MyToken {

    public _token: string = ''

    get token() {
        return this._token
    }


    async getToken() {
        try {
            const data = await druidStorage.getData(STORAGE_KEY)
            this._token = data || ''
            return this._token
        } catch (err) {
            console.log('为获取到token');
            return ''
        }
    }

    async setToken(value: string) {

        try {
            await druidStorage.saveData(STORAGE_KEY, value)
            this._token = value
        } catch (err) {
            throw err
        }

    }

    async clean() {
        try {
            druidStorage.removeData(STORAGE_KEY)
            this._token = ''
        } catch (err) {
            throw err
        }
    }

}


const myToken = new MyToken()

export default myToken
