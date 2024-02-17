import { ObjectId } from "mongodb";
import { Log } from "../models/Logs.js";

export class MongoDB {
    static async save(req, newObject, collectionName, Schema) {
        const { user, method } = req;
        const changes = null;
        const log = new Log({
            user: user.uid,
            collectionName,
            message: method === 'POST' ? 0 : 1,
            changes
        });
        const result = await log.save();
        if (result) {
            const schema = new Schema({ ...newObject, logs: [result._id] });
            return await schema.save();
        }
    }

    static async saveMany(req, newObjects, collectionName, Schema) {
        const { user, method } = req;
        let savedLogs = [];
        let savedSchemas = [];

        try {
            // Save logs for each new object
            for (const newObj of newObjects) {
                const log = new Log({
                    user: user.uid,
                    collectionName,
                    message: method === 'POST' ? 0 : 1,
                    changes: null // Since it's a batch operation, changes will be null
                });
                const savedLog = await log.save();
                savedLogs.push(savedLog._id);
            }

            // Create an array to hold the new documents with their respective logs
            const schemaArray = newObjects.map((obj, index) => {
                return new Schema({ ...obj, logs: [savedLogs[index]] });
            });

            // Save each document and push the saved schema into the array
            for (const schema of schemaArray) {
                const savedSchema = await schema.save();
                savedSchemas.push(savedSchema);
            }

            return savedSchemas;
        } catch (error) {
            console.error("Error in saveMany:", error);
            // If any error occurs during the process, delete the logs that were created
            await MongoDB.deleteLogs(savedLogs);
            throw error;
        }
    }

    static async updateOne(req, newObject, collectionName, Schema) {
        const { user, method } = req;
        let changes = [];
        try {
            const oldObject = await Schema.findOne({ _id: new ObjectId(newObject._id) });
            if (!oldObject) {
                throw new Error("Document not found");
            }
            for (const key in newObject) {
                if (key !== '_id' && oldObject[key] !== newObject[key]) {
                    changes.push({
                        field: key,
                        oldValue: `${oldObject[key]}`,
                        newValue: `${newObject[key]}`
                    });
                }
            }

            const log = new Log({
                user: user.uid,
                collectionName,
                message: method === 'POST' ? 0 : 1,
                changes,

            });

            const savedLog = await log.save();
            const schema = await Schema.findOneAndUpdate(
                { _id: new ObjectId(newObject._id) },
                { ...newObject, $push: { logs: savedLog._id } },
                { new: true }
            );

            if (!schema) {
                throw new Error("Failed to update document");
            }

            return schema;
        } catch (error) {
            console.error("Error in updateOne:", error);
            throw error;
        }
    }

    static async deleteLogs(logs) {
        try {
            console.log(logs); // Ensure logs array contains valid object IDs
            // await Promise.all(logs.map(async (logId) => await Log.deleteOne({ _id: new ObjectId(logId) })));
        }
        catch (err) {
            console.log(err);
            throw new Error(err)
        }
    }


    static async deleteMany(Ids, Schema) {
        try {
            // Get documents based on Ids
            const objDocument = await Promise.all(Ids.map(async (id) => {
                return await Schema.findOne({ _id: new ObjectId(id) });
            }));
            console.log(objDocument);
            // Extract log ids from documents
             objDocument.map(doc => {console.log(doc)});

            // await this.deleteLogs(logsArray);
            // Delete documents
            await Promise.all(Ids.map(async (id) => {
                await Schema.deleteOne({ _id: new ObjectId(id) });
            }));
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }


}

export const generateLog = async (req, newObject, collectionName, schema) => {
    const { user, method } = req;
    let changes = [];

    if (method === 'POST') {
        changes = null;
    } else {

    }

    const log = new Log({
        userId: user.uid,
        collectionName,
        message: method === 'POST' ? 0 : 1,
        changes
    });
    const result = await log.save();
    return result._id
};
