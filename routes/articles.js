const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
/* Obtenir tous les posts */
router.get("/all", async (req, res)=> 
{
  const posts= await prisma.post.findMany({
    where:{
      published:true
    }
  })
  res.json(posts); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = parseInt(skip) || 1;
    take = parseInt(take) || 100;
  const postAll= await prisma.post.findMany({
      skip:skip,
      take:take,
      where:{
        published:true
      },
      include:{
        autor: true,
        comments:true,
        categories:true
      }
  })
  if(postAll) res.json(postAll)
  else res.sendStatus(400)
})
/* Ajouter un Post */
router.post('/',async(req,res)=>{
    const addPost=await prisma.post.create({
      data:{
        title:req.body.title,
        content:req.body.content,
        photos:req.body.photos,
        published:req.body.published,
        autorId:req.user.id
      } 
    })
    if(addPost)
    {
      res.status(200)
      res.json(addPost)
    }
    else{
      res.status(500)
      res.send("Erreur Ce Post existe déja")
    }
  })
/* Recherche d'un Post  avec id*/
router.get("/:id",async (req, res)=> {
    const {id}=req.params
    const post = await prisma.post.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(post==null) {
      res.status(400)
      res.send("n'est pas existée")
    }
    else
    {
      res.status(200)
      res.json(post)
    }
  });
/* Recherche d'un Post avec titre*/ //Refaire
router.get("/titre/:titre",async (req, res)=> {
  const {titre}=req.params
  const post = await prisma.post.findMany({
    where:{
      title:titre
    }
  });
  if(post==null) {
    res.status(400)
    res.send("n'est pas existée")
  }
  else
  {
    res.status(200)
    res.json(post)
  }
});
/* Modification de post */
router.patch("/update", async (req, res) => {
    const post= await prisma.post.update({
      where: { id: Number(req.body.id) },
      data:{
        title:req.body.title,
        content:req.body.content,
        photos:req.body.photos,
        published:req.body.published,
        autorId:req.user.id
      } 
    });
    console.log(req.body);
    res.send(post);
  });
/* Suppression d'un post */
router.delete('/:id',async (req,res)=>{
    const post = await prisma.post.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(post == null)
    {
      res.status(400);
      res.send("Ce post  n'existe pas");
    }
    else
       {
         const deletePost= await prisma.post.delete({
           where:{id:post.id}
         });
         if(deletePost)
         {
           res.status(200);
           res.send('cette post  est supprimer avec succes !!!').end();
         }
         else{
           res.status(400);
           res.send("Erreur supprimer d'abord tout les post qui contient ce post");
         }
       }
  
  })
module.exports=router;