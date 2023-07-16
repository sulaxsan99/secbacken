const express = require('express');
const router = express.Router();
const visitorSchema = require('../models/visitor')

router.post("/create", async (req, res) => {
    try {
      console.log(req.body)
      const secData = await visitorSchema.findOne( {visitorID:req.body.visitorID} );
   
      if (secData) {
        return res.status(400).json("visitorID already exists");
      }

      const postData = await new visitorSchema({
        visitorID:req.body.visitorID,
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
          message:"visiter added successfully"});
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

router.get("/allvisitor",async(req,res)=>{
try {
    const visitor = await visitorSchema.find();
    if(!visitor){
        return res.status(200).json("no visitor data available")

    }else{
      return res.status(200).json({visitor})

    }
} catch (error) {
    return res.status(200).json({error})
}
})
router.get("/one/:visitorID",async(req,res)=>{
  try {
      const visitor = await visitorSchema.findOne({visitorID:req.params.visitorID});
      if(!visitor){
          return res.status(200).json("no visitor data available")
  
      }else{
        return res.status(200).json({visitor})
  
      }
  } catch (error) {
      return res.status(400).json(error)
  }
  })
router.put('/update/:visitorID', async (req, res) => {
    try {
  
        const Onevistor = await visitorSchema.findOne({visitorID:req.params.visitorID})
        if(!Onevistor) {
            return res.status(200).json("visitor not found")
        }
        const   visitorID =req.params.visitorID
        const updateEmp = await visitorSchema.findOneAndUpdate({visitorID},{$set: req.body},{ new: true });
        res.status(200).json({ message:"visitor updated successfully", updateEmp});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'An error occurred while updating the visitor.' });
    }

});


router.delete('/delete/:visitorID',async(req,res)=>{
try {
    const deletevisitor= await visitorSchema.findOne({visitorID:req.params.visitorID});
    if(!deletevisitor) {
        return res.status(200).json("visitor not found")
    }

    const dvis= await visitorSchema.findOneAndRemove({visitorID:req.params.visitorID})
    res.status(200).json({ message:"visitor delete successfully", dvis});

} catch (error) {
    res.status(400).json({ error: 'product not deleted ' });

}
})
module.exports=router;
