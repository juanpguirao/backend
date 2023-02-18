import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploader = multer({ storage })
export default __dirname;

