import { Router } from 'express';
import { UsersFileManager } from "../daos/fileManagers/user.manager.js";
import options from '../config/options.js';


const router = Router();

const userService = new UsersFileManager(options.fileSystem.usersFileName)


router.get('/', async(req, res) =>{
    try{
        const data = await userService.getAll();
        res.send(data)
    }catch (error){
        res.send(error);
    }

});

router.post('/', async (req, res)=>{
    try{
        const user = await userService.save(user);
        res.status(201).json({
            success: true,
            data: users
        })
    }catch(error){
        res.send(error);
    }
})
router.get("/:userId", async(req,res)=> {
    try{
        const user = await userServece.getById(userId);
        res.send(user);
    }catch(error){
            res.send(error);
    }
});

router.put("/:userId",async(req,res)=>{
    const {userId} = req.params;
    const user = req.body;
    try{
        const data = await userService.updateById(user,UserId);
        res.send(data);
    }catch(error){
        res.send(error);
    }
})

export default router;