const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
/* Obtenir tous les posts */
router.get("/all", async (req, res)=> 
{
  const users= await prisma.user.findMany()
  res.json(users); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = skip || 1;
    take = take || 10;
  const userAll= await prisma.user.findMany({
      skip:skip,
      take:take
  })
  if(userAll) res.json(usertAll)
  else res.sendStatus(400)
})
/* Ajouter un user */
router.post('/',async(req,res)=>{
    const addUser=await prisma.user.create({
      data:{
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
      } 
    })
    if(addUser)
    {
      res.status(200)
      res.json(addUser)
    }
    else{
      res.status(500)
      res.send("Erreur Ce User existe déja")
    }
  })
/* Recherche d'un Post  avec id*/
router.get("/:id",async (req, res)=> {
    const {id}=req.params
    const post = await prisma.user.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(user==null) {
      res.status(400)
      res.send("pas de users")
    }
    else
    {
      res.status(200)
      res.json(user)
    }
  });
/* Suppression d'un post */
router.delete('/:id',async (req,res)=>{
    const user = await prisma.user.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(user == null)
    {
      res.status(400);
      res.send("pas de user");
    }
    else
       {
         const deleteUser= await prisma.user.delete({
           where:{id:user.id}
         });
         if(deleteUser)
         {
           res.status(200);
           res.send('ce user est supprimer avec succes !!!').end();
         }
         else{
           res.status(400);
           res.send("Erreur supprimer ");
         }
       }
  
  })
module.exports=router;