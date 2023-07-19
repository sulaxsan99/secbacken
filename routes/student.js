const express = require('express');
const router = express.Router();
const studentSchema = require('../models/student')

router.post("/create", async (req, res) => {
    try {
      console.log(req.body)
      const secData = await studentSchema.findOne( {SID:req.body.SID} );
   
      if (secData) {
        return res.status(400).json("student id  already exists");
      }

      const postData = await new studentSchema({
        SID:req.body.SID,
        firstName:req.body.firstName,
        nic:req.body.nic,
        lastName:req.body.lastName,
        description:req.body.description,
        vehicleType:req.body.vehicleType,
        licenceNo:req.body.licenceNo,
        checkIn:req.body.checkIn,
        checkout:req.body.checkout,
          });
      const postUser = await postData.save();
      if (postUser) {
        return res.status(200).json({success:true,
          message:"student added successfully"});
      }
    } catch (err) {
        // console.log(err)
        if(err.code===0){
            return res.status(400).json([err,"duplicate key found"]);
      }if(err.code===11000){
        return res.status(400).json(err);

      }
      return res.status(400).json({success:false,
        mesage:err});
    }
  });

router.get("/allstudents",async(req,res)=>{
try {
    const students = await studentSchema.find();
    if(!students){
        return res.status(200).json("no student data available")

    }else{
      return res.status(200).json({students})

    }
} catch (error) {
    return res.status(200).json({error})
}
})
router.get("/one/:SID",async(req,res)=>{
  try {
      const student = await studentSchema.findOne({SID:req.params.SID});
      if(!student){
          return res.status(200).json("no student data available")
  
      }else{
        return res.status(200).json({student})
  
      }
  } catch (error) {
      return res.status(400).json(error)
  }
  })
router.put('/update/:id', async (req, res) => {
    try {
  
        const Onev = await studentSchema.findById(req.params.id);
        if(!Onev) {
            return res.status(200).json("student not found")
        }
        const   SID =req.params.SID
        const updateEmp = await studentSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        res.status(200).json({ message:"student updated successfully", updateEmp});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'An error occurred while updating the student.' });
    }

});


router.delete('/delete/:id',async(req,res)=>{
try {
    const deletestudent= await studentSchema.findById(req.params.id);
    if(!deletestudent) {
        return res.status(200).json("student not found")
    }

    const dvis= await studentSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ message:"student delete successfully", dvis});

} catch (error) {
    res.status(400).json({ error: 'student not deleted ' });

}


})
module.exports=router;
