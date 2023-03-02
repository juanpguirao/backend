import { UserModel } from "../../models/user.models.js";

class UserMongoManager {
    async getAll() {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw new Error(`Couldn't read file ${error}`)
        }
    }

    async save(obj) {
        try {
            const userCreated = await UserModel.create(obj);
            return userCreated;
        } catch (error) {
            throw new Error(`Error saving: ${error}`);
        }
    }

    async updateById(info, id) {
        try {
            const userUpdated = await UserModel.findByIdAndUpdate(id, info,{new:true});
            return userUpdated;
        } catch (error) {
            throw new Error(`Error updating ${error}`);
        }
    }

    async updateById(info, id) {
        try {
            const userUpdated = await UserModel.findByIdAndUpdate(id, info,{new:true});
            return userUpdated;
        } catch (error) {
            throw new Error(`Error updating ${error}`);
        }
    }

    async deleteById(id) {
        try {
            const response = await UserModel.findByIdAndDelete(id);
            return `Element with email: ${response.email} deleted successfully`;
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await UserModel.deleteMany({});
            return "delete all successfully";
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

}

export {UserMongoManager}