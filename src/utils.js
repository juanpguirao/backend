import multer from 'multer'
import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve(__dirname, '../public/img'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


export const uploader = multer({ storage })
export default __dirname;

