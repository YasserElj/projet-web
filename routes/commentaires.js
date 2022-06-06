// const auth=require("../middleware/auth");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
/* get comments */
router.get("/all", async (req, res)=> 
{
  const cmnt= await prisma.comment.findMany({})
  res.json(cmnt); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = parseInt(skip) || 1;
    take = parseInt(take) || 10;
  const cmnt= await prisma.comment.findMany({
      skip:skip,
      take:take,
  })
  if(cmnt) res.json(cmnt)
  else res.sendStatus(400)
})
/* Add comment */
router.post('/',async(req,res)=>{
    const addComment=await prisma.comment.create({
      data:{
        name:req.body.name
      } 
    })
    if(addComment)
    {
      res.status(200)
      res.json(addComment)
    }
    else{
      res.status(500)
      res.send("comment exists already")
    }
  })
/* comment search */
router.get("/:id", async (req, res)=> {
    const {id}=req.params
    const comment = await prisma.comment.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(comment==null) {
      res.status(400)
    }
    else
    {
      res.status(200)
      res.json(comment)
    }
  });

/* comment update  */
router.patch("/update", async (req, res) => {
    const comment= await prisma.comment.update({
      where: { id: Number(req.body.id) },
      data:{
        name:req.body.name
      } 
    });
    console.log(req.body);
    res.send(comment);
  });
/* comment deleting */
router.delete('/:id',async (req,res)=>{
    const comment = await prisma.comment.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(comment == null)
    {
      res.status(400);
      res.send("comment doesnt exist");
    }
    else
       {
         const deletecomment= await prisma.comment.delete({
           where:{id:comment.id}
         });
         if(deletecomment)
         {
           res.status(200);
           res.send('comment deleted').end();
         }
         else{
           res.status(400);
         }
       }
  
  })
module.exports=router;