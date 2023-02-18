import fs from "fs";
import path from "path";

class UsersFileManager{
    contructor(filename){
        this.filePath = path.join(`/data/${filename}`);
    }
    async getAll(){
        if(fs.existsSync(this.filePath)){
            try{
                const contentFile = await fs.promises.readFile(this.filePath,'utf8');
                return JSON.parse(contentFile);
            }
            catch(error){
                throw new Error(`'Couldn't read dile ${error}`);
            }
        }else{
            throw new Error ("File doesn`t exists");
        }
    }
    async save(obj){
        try{
            const objects = await this.getAll();
            let newId;
            if(objects.length === 0){
                newId = 1;
            }
            else{
                newId = objects [objects.length - 1].id +1;
            }
            const newObj = {id: newId, ...obj };
            objects.push(newObj);
            await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2))
            return newObj;
        }catch (error) {
            throw new Error (`Error saving: ${error}`);
        }
    }
        
    async getById(id){
            const objects = await this.getAll();
            const index = objects.findIndex(element => element.id == id);
        if(index === -1){
            throw new Error (`Error searching:
            Element whit id: ${id} not found`);
        }else{
            const objectFound = objects[index];
            return objectFound; 
        }
    }
        
    async updateById(info, id){
        const objects = await this.getAll()
        const index = object.findIndex(element => element.id == id)
        if(index == -1){
            throw new Error(`Error updating: Element with id: ${id}not found`);
        }else{
            objects[index] = {id, ...info}
            try{
                await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2))
                return objects[index];
            }catch(error){
                throw new Error (`Error updatin ${error}`);
            }
        }
    }
    async deleteById(id){
        const objects = await this.getAll();
        const index = objects.findeIndex(element => element.id == id);
        if (index == -1){
            throw new Error(`Error: Element with id: ${id} not found`);
        }
        const object = objects[index];
        objects.splice(index, 1 )
        try{
            await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2));
            return {mesage:`Element with email:${object.email}delete successfully`};
        }catch (error){
            throw new Error(`Error deletin: ${error}`);
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2));
            return { message: "Delete All Successfully"}
        }catch(error){
            console.log("Error deleteAll", error);
            return{ message:"Error deleting"};
        }
    }

}
export {UsersFileManager}