import ImageKit from '@imagekit/nodejs';
import config from "../config/config.js";

const client = new ImageKit({
    privateKey: config.imageKitPrivateKey
})

const uploadFile = async ({ buffer, fileName, folder = "SNITCH" }) => {
    try {
        const result = client.files.upload({
            file: await ImageKit.toFile(buffer),
            fileName,
            folder
        })
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default uploadFile

