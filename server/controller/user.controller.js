const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const users = prisma.users;

const get = async (req, res) => {
  try {
    users.findMany({}).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};

const getOne = async (req, res) => {
  try {
    users.findFirst({where:{email:req.params.email}}).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};


const add = async (req,res)=>{
  try{
    users.create({

      data: {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      image:req.body.image,
      ratings:req.body.ratings,
      pendingRequests:req.body.pendingRequests,
      location:req.body.location,
      contactList:req.body.contactList,
      verified:false,
    }
   
  }).then(result=> res.json(result))
  } catch (err){
    res.json(err)
  }
}

const verify = (req,res)=>{
   console.log(typeof req.body.verified);
   users.update({
      where: {user_id:+req.params.id },
      data: { verified:req.body.verified},
    }).then((result) => {
      res.json(result);
    })
   .catch ((err)=> {
    res.json(err)
  })
}




module.exports = { get, add ,verify,getOne};
