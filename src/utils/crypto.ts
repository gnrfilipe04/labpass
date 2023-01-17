import { CRYPTO_KEY } from '@env';
import CryptoJS from 'react-native-crypto-js'

export const encrypt = (value: string) => {
    let encrypted = CryptoJS.AES.encrypt(value, CRYPTO_KEY).toString();

    return encrypted
}

export const decrypt = (value: string) => {
    let decrypted  = CryptoJS.AES.decrypt(value, CRYPTO_KEY).toString(CryptoJS.enc.Utf8);

    return decrypted
}

