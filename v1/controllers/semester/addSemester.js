export const addSemester = (req, res) => {
    try{
        const data = req.body.data;
        console.log(data);
    }
    catch(err){
        console.error(err);
        res.status(500).json(({ success: false, message: "Internal server error! Team working on it to fix" }))
    }
}