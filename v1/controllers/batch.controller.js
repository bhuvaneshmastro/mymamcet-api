import expressAsyncHandler from "express-async-handler";

const query =  expressAsyncHandler(async  (req, res) => {
    try {
        const allCourses = await db.collection('courses').find({}).toArray();
        const courseNames = allCourses.map((course) => course.courseName);

        const academicYears = await db.collection('batches').distinct('academicYear', { academicYear: { $exists: true, $ne: null } });

        const dataToSend = {
            courseNames: courseNames.length > 0 ? courseNames : null,
            academicYears: academicYears.length > 0 ? academicYears : null
        };

        res.status(200).json({
            success: true,
            message: "Queries fetched successfully",
            data: dataToSend
        });

        res.end()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})

const details2 =  expressAsyncHandler( async (req, res) => {
    try {
        const {id}  = req.body.data;
        const batch = await db.collection('batches').findOne({_id: new ObjectId(id)});

        if(!batch){
            return res.status(404).json({success: false, message: "Batch does not exist"});
        }

        res.status(200).json({
            success: true,
            message: "Batch details fetched successfully",
            data: batch
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const all =  expressAsyncHandler(async (req, res) => {
    try {
        const allBatches = await db.collection('batches').find({}).toArray();

        if(!allBatches){
            res.status(200).json({success: false, message: "No batches found"});
            res.end();
        }

        res.status(200).json({
            success: true,
            message: "Queries fetched successfully",
            data: allBatches
        });

        res.end()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
const update =expressAsyncHandler( async (req, res) => {
    try {
        const data = req.body.data;
        const doesCourseExit = await db.collection('batches').findOne({ _id: new ObjectId(data.id) });
        if (doesCourseExit) {
            const result = await db.collection('batches').updateOne({ _id: new ObjectId(data.id) }, {
                $set: {
                    batchName: data.batchName,
                    semester: data.semester,
                    academicYear: data.academicYear,
                    year: data.year,
                    course: data.course,
                    program: data.program
                },
            });
            return res.status(200).json({ success: true, message: "Batch edited successfully" });
        }
        else {
            return res.status(200).json({ success: false, message: "Batch doesn't exist" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
})
 const add1 = expressAsyncHandler(async (req, res) => {
    try {
        const { batchName, semester, academicYear, courseName, program, students, studentsData, department } = req.body.data;
        const batchExists = await checkBatchExistence(batchName, courseName);
        if (!batchExists) {
            await insertBatchData(batchName, semester, academicYear, courseName, program, students, studentsData, department);
            res.status(200).json({ success: true, message: "Batch added successfully" });
        } else {
            res.status(409).json({ success: false, message: "Batch exists with the same name, course, and program" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error! Team is working on it to fix" });
    }
});

async function checkBatchExistence(batchName, courseName) {
    const existingBatch = await db.collection('batches').findOne({ batchName, courseName });
    console.log(existingBatch);
    return !!existingBatch;
}

async function insertBatchData(batchName, semester, academicYear, courseName, program, students, studentsData, department) {
    await db.collection('batches').insertOne({ batchName: batchName, semester: semester, academicYear: academicYear, courseName: courseName, program: program, students: students, department });

    if (Array.isArray(studentsData)) {
        await db.collection('students').insertMany(studentsData);
    } else {
        console.error('studentsData is not an array of documents');
    }
}

export{
    query , 
    details2 , 
    all , 
    update , 
    add1
}