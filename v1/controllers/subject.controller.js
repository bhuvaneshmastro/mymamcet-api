import expressAsyncHandler from "express-async-handler";
const  add = expressAsyncHandler(async (req, res) => {
    try {
        const data = req.body.data;
        const doesSubjectExit = await db.collection('subjects').findOne({ courseName: data.subjectName });
        if (!doesSubjectExit) {
            const result = db.collection('subjects').insertOne(data);
            return res.status(200).json({ success: true, message: "Subject added successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject already exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const queries = expressAsyncHandler(async(req, res)=> {
    try{
        const {program, department} = req.body.data;
        const allBatches = await db.collection('batches').find({program, department}, {projection: {students: 0}}).toArray();
        res.status(200).json({success: true, message: 'Queries fetched successfully', data: allBatches})
    }
    catch(err){
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
 const all = expressAsyncHandler( async (req, res) => {
    try {
        const doesSubjectExit = await db.collection('subjects').find({}).toArray();
        if (doesSubjectExit) {
            const data = encrypt(doesSubjectExit);
            return res.status(200).json({ success: true, message: "All subjects fetched successfully", data: data });
        }
        else {
            return res.status(200).json({ success: false, message: "Subjects not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const details = expressAsyncHandler( async (req, res) => {
    try {
        const courseId = req.body.data;
        const doesSubjectExit = await db.collection('subjects').find({ _id: new ObjectId(courseId) }).toArray();
        if (doesSubjectExit) {
            const data = encrypt(doesSubjectExit);
            return res.status(200).json({ success: true, message: "Subject details fetched successfully", data: data });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject details not found" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const edit = expressAsyncHandler( async (req, res) => {
    try {
        const data = req.body.data;
        const doesSubjectExit = await db.collection('subjects').findOne({ _id: new ObjectId(data._id) });
        if (doesSubjectExit) {
            const result = await db.collection('subjects').updateOne({ _id: new ObjectId(data._id) }, {
                $set: {
                    subjectName: data.subjectName,
                    subjectCode: data.subjectCode,
                    subjectCredit: data.subjectCredit,
                    regulation: data.regulation,
                    department: data.department,
                    program: data.program,
                },
            });
            return res.status(200).json({ success: true, message: "Subject edited successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const delete1 =  expressAsyncHandler(async (req, res) => {
    try {
        const courseId = req.body.data;
        const doesSubjectExit = await db.collection('subjects').findOne({ _id: new ObjectId(courseId) });
        if (doesSubjectExit) {
            const result = await db.collection('subjects').deleteOne({ _id: new ObjectId(courseId) })
            return res.status(200).json({ success: true, message: "Subject deleted successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Subject doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
export{
    add , 
    all , 
    queries , 
    delete1 , 
    edit , 
    details
}