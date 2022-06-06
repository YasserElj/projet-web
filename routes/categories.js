// const auth=require("../middleware/auth");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
/* get categories */
router.get("/all", async (req, res)=> 
{
  const categories= await prisma.category.findMany({})
  res.json(categories); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = parseInt(skip) || 0;
    take = parseInt(take) || 4;
  const catg= await prisma.category.findMany({
      skip:skip,
      take:take,
  })
  if(catg) res.json(catg)
  else res.sendStatus(400)
})
/* Add category */
router.post('/',async(req,res)=>{
    const addCateg=await prisma.category.create({
      data:{
        name:req.body.name
      } 
    })
    if(addCateg)
    {
      res.status(200)
      res.json(addCateg)
    }
    else{
      res.status(500)
      res.send("Category exists already")
    }
  })
/* Category search */
router.get("/:id", async (req, res)=> {
    const {id}=req.params
    const category = await prisma.category.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(category==null) {
      res.status(400)
    }
    else
    {
      res.status(200)
      res.json(category)
    }
  });

/* category update  */
router.patch("/update", async (req, res) => {
    const category= await prisma.category.update({
      where: { id: Number(req.body.id) },
      data:{
        name:req.body.name
      } 
    });
    console.log(req.body);
    res.send(category);
  });
/* category deleting */
router.delete('/:id',async (req,res)=>{
    const category = await prisma.category.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(category == null)
    {
      res.status(400);
      res.send("Category doesnt exist");
    }
    else
       {
         const deletecategory= await prisma.category.delete({
           where:{id:category.id}
         });
         if(deletecategory)
         {
           res.status(200);
           res.send('category deleted').end();
         }
         else{
           res.status(400);
         }
       }
  
  })
module.exports=router;