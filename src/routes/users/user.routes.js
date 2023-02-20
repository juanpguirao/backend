import { Router } from 'express';
import { UsersFileManager } from "../../daos/fileManagers/user.manager.js";
import options from '../../config/options.js';



const router = Router();

const userService = new UsersFileManager(options.fileSystem.usersFileName)


router.get("/", async(req,res)=>{
    try {
        const data = await userService.getAll();
        res.status(200).json({
            users:data,
            status:"EXITOSO"
        });
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"ERROR"
        })
    }
});

router.post("/",async(req,res)=>{
    const user = req.body;
    try {
        const data = await userService.save(user);
        res.status(200).json({
            user:data,
            status:"EXITOSO"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"ERROR"
        })
    }
})

//api/users/1000
//ruta pendiente, metodo por crear en el manager de mongo
router.get("/:userId",async(req,res)=>{
    const {userId} = req.params;
    try {
        const data = await userService.getById(userId);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:userId",async(req,res)=>{
    const {userId} = req.params;
    const user = req.body;
    try {
        const data = await userService.updateById(user,userId);
        res.status(200).json({
            user:data,
            status:"EXITOSO"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"ERROR"
        })
    }
});

router.delete("/:userId",async(req,res)=>{
    const {userId} = req.params;
    try {
        const response = await userService.deleteById(userId);
        res.status(200).json({
            message:response,
            status:"EXITOSO"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"ERROR"
        })
    }
});

router.delete("/",async(req,res)=>{
    try {
        const response = await userService.deleteAll();
        res.status(200).json({
            message:response,
            status:"EXITOSO"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"ERROR"
        })
    }
});

export default router;