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
router.put('/update/:SID', async (req, res) => {
    try {
  
        const Onev = await studentSchema.findOne({SID:req.params.SID})
        if(!Onev) {
            return res.status(200).json("visitor not found")
        }
        const   SID =req.params.SID
        const updateEmp = await studentSchema.findOneAndUpdate({SID},{$set: req.body},{ new: true });
        res.status(200).json({ message:"visitor updated successfully", updateEmp});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'An error occurred while updating the visitor.' });
    }

});


router.delete('/delete/:SID',async(req,res)=>{
try {
    const deletestudent= await studentSchema.findOne({SID:req.params.SID});
    if(!deletestudent) {
        return res.status(200).json("visitor not found")
    }

    const dvis= await studentSchema.findOneAndRemove({SID:req.params.SID})
    res.status(200).json({ message:"visitor delete successfully", dvis});

} catch (error) {
    res.status(400).json({ error: 'product not deleted ' });

}
})
module.exports=router;
