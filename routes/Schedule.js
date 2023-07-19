const express = require('express');
const router = express.Router();
const ScheduleSchema = require('../models/schedule')

router.post("/create", async (req, res) => {
    try {
      console.log(req.body)
      const secData = await ScheduleSchema.findOne( {ScheduleID:req.body.ScheduleID});
   
      if (secData) {
        return res.status(400).json("Schedule id  already exists");
      }

      const postData = await new ScheduleSchema({
        ScheduleID:req.body.ScheduleID,
        date:req.body.date,
        Description:req.body.Description,
                Asssignedto:req.body.Asssignedto,
        startTime:req.body.startTime,
        EndTime:req.body.EndTime,
          });
      const postUser = await postData.save();
      if (postUser) {
        return res.status(200).json({success:true,
          message:"Schedule added successfully"});
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

router.get("/allSchedule",async(req,res)=>{
try {
    const Schedule = await ScheduleSchema.find();
    console.log(Schedule)
    if(!Schedule){
        return res.status(200).json("no Schedule data available")

    }else{
      return res.status(200).json({Schedule})

    }
} catch (error) {
    return res.status(200).json({error})
}
})
router.get("/one/:ScheduleID",async(req,res)=>{
  try {
      const Schedule = await ScheduleSchema.findOne({ScheduleID:req.params.ScheduleID});
      if(!Schedule){
          return res.status(200).json("no Schedule data available")
      }else{
        return res.status(200).json({Schedule})
  
      }
  } catch (error) {
      return res.status(400).json(error)
  }
  })
router.put('/update/:id', async (req, res) => {
    try {
  
        const Schedule = await ScheduleSchema.findById(req.params.id)
        if(!Onev) {
            return res.status(200).json("Schedule not found")
        }
        const ScheduleID=req.params.ScheduleID
        const updateEmp = await ScheduleSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        res.status(200).json({ message:"Schedule updated successfully", updateEmp});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'An error occurred while updating the Schedule.' });
    }

});


router.delete('/delete/:id',async(req,res)=>{
try {
    const Schedule = await ScheduleSchema.findById(req.params.id);
    if(!Schedule) {
        return res.status(200).json("Schedule not found")
    }

    const dvis= await ScheduleSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ message:"Schedule delete successfully", dvis});

} catch (error) {
    res.status(400).json({ error: 'Schedule not deleted ' });

}
})
module.exports=router;
