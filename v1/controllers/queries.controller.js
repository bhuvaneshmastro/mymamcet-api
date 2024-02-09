import expressAsyncHandler from "express-async-handler";
import { db } from "../../config/db.js";

const getQueries = expressAsyncHandler(async (req, res) => {
    try {
        const params = req.query;
        const results = {};

        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                const collectionResult = await db.collection(key).find({}, params[key]).toArray();

                collectionResult.forEach(doc => {
                    for (const field in doc) {
                        if (doc.hasOwnProperty(field) && params[key].includes(field)) {
                            if (!results[field]) {
                                results[field] = [];
                                results[`option${field}`] = [];
                            }
                            if (!results[field].includes(doc[field])) {
                                const labelValueObject = { label: doc[field], value: doc[field] };
                                results[field].push(doc[field]);
                                results[`option${field}`].push(labelValueObject);
                            }
                        }
                    }
                });
            }
        }
        res.status(200).json({ success: true, message: "Field values fetched successfully", queries: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error! Team working on it to fix" });
    }
});

export { getQueries }