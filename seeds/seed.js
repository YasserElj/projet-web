// const faker = require('faker');
const { faker } = require('@faker-js/faker');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const userAdmin = ({
    email:faker.unique(faker.internet.email),
    name:faker.name.findName(),
    password:faker.internet.password(8),
    role:'ADMIN'
})

const users=[...Array(10)].map((User)=>({
    email:faker.unique(faker.internet.email),
    name:faker.name.findName(),
    password:faker.internet.password(8)
}))
const posts=[...Array(100)].map((Post)=>({
    title :faker.lorem.sentence(3),
    content :faker.lorem.sentences(),
    photos : faker.image.abstract(),
    createdAt : faker.date.recent(),
    updateAt  : faker.date.recent(),
    published : faker.datatype.boolean(),
    autorId : faker.helpers.arrayElement([1,2,3,4,5,6,7,8,9,10]),
    
}))
const categorys =[...Array(4)].map((Category)=>({
    name:faker.lorem.sentence(3)
}))

async function main()
{
    //delete all data
    await prisma.Comment.deleteMany({});
    await prisma.Post.deleteMany({});
    await prisma.Category.deleteMany({});
    await prisma.User.deleteMany({});
    const resetu= await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`
    console.log("Start seeding ....");
    const userSeed=await prisma.user.createMany({
        data:users
    });
    const categoryAdd =await prisma.category.createMany({
        data:categorys
    })

     for (let i=0;i<100;i++)
     {
         const postsAdd=await prisma.post.create({
             data:posts[i]
         });
         for(let i=0;i<20;i++)
         {
             const comment =await prisma.comment.create({
                 data: 
                 {
                    email: faker.internet.email(),
                    contenu : faker.lorem.sentences(),
                    postId : postsAdd.id
                 }
             })
         }
     }
    //  admin user
     const adminSeed=await prisma.user.create({data:userAdmin})
}
main().catch((e) =>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});