// const auth=require("../middleware/auth");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
/* get users */
router.get("/all", async (req, res)=> 
{
  const usr= await prisma.user.findMany({})
  res.json(usr); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
  skip = parseInt(skip) || 1;
  take = parseInt(take) || 100;
  const usr= await prisma.user.findMany({
      skip:skip,
      take:take,
  })
  if(usr) res.json(usr)
  else res.sendStatus(400)
})
/* Add user */
router.post('/',async(req,res)=>{
    const adduser=await prisma.user.create({
      data:{
        name:req.body.name
      } 
    })
    if(adduser)
    {
      res.status(200)
      res.json(adduser)
    }
    else{
      res.status(500)
      res.send("user exists already")
    }
  })
/* user search */
router.get("/:id", async (req, res)=> {
    const {id}=req.params
    const user = await prisma.user.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(user==null) {
      res.status(400)
    }
    else
    {
      res.status(200)
      res.json(user)
    }
  });

/* user update  */
router.patch("/update", async (req, res) => {
    const user= await prisma.user.update({
      where: { id: Number(req.body.id) },
      data:{
        name:req.body.name
      } 
    });
    console.log(req.body);
    res.send(user);
  });
/* user deleting */
router.delete('/:id',async (req,res)=>{
    const user = await prisma.user.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(user == null)
    {
      res.status(400);
      res.send("user doesnt exist");
    }
    else
       {
         const deleteuser= await prisma.user.delete({
           where:{id:user.id}
         });
         if(deleteuser)
         {
           res.status(200);
           res.send('user deleted').end();
         }
         else{
           res.status(400);
         }
       }
  
  })
module.exports=router;