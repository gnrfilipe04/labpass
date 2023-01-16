import CryptoJS from 'react-native-crypto-js'

const KEY = '2281de03f35f9b4e58e398e0c4b40051'

export const encrypt = (value: string) => {
    let encrypted = CryptoJS.AES.encrypt(value, KEY).toString();

    return encrypted
}

export const decrypt = (value: string) => {
    let decrypted  = CryptoJS.AES.decrypt(value, KEY).toString(CryptoJS.enc.Utf8);

    return decrypted
}

