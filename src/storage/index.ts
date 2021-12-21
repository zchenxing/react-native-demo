import AsyncStorage from "@react-native-async-storage/async-storage";

class DruidStorage {

    saveData = async (name: string, value: any) => {
        try {
            await AsyncStorage.setItem(name, JSON.stringify(value))
        } catch (err) {
            console.error('Storage save data error');
            throw err
        }
    }


    getData = async (name: string) => {

        try {
            const jsonValue = await AsyncStorage.getItem(name)
            return jsonValue ? JSON.parse(jsonValue) : null
        } catch (err) {
            console.error('Storage get data error');
            throw err
        }
    }


    removeData = async (name: string) => {
        try {
            await AsyncStorage.removeItem(name)
        } catch (err) {
            console.error('Storage remove data error');
            throw err
        }

    }
}


const druidStorage = new DruidStorage()

export default druidStorage
