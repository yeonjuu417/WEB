const {user} = require("../models");
module.exports = {
  signInController: async (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    const {email,password} = req.body;
   const userinfo = await user.findOne({
     where: {email,password}
   })
   console.log(userinfo)
   if(!userinfo){
     res.status(404).send("invalid user")
   }else{
     req.session.userid = userinfo.id;
     res.status(200).json(userinfo);
   }
   
  },
  signUpController: async (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    if(!req.body.email || !req.body.password || !req.body.username || !req.body.mobile ){
      res.status(422).send('insufficient parameters supplied')
    }
    const email = await user.findOne({
      where: {email : req.body.email}
    })

    if(email){
      res.status(409).send('email exists')
    }else{
      let data = await user.create({
        email: req.body.email,
        password: req.body.password,
        username : req.body.username,
        mobile: req.body.mobile
    },)
    res.status(201).json(data)
    }
  },
  signOutController: (req, res) => {
    // TODO: 로그아웃 로직 작성
    req.session.destroy()
    res.status(205).send('Logged out successfully')
  
  },
  userController: async (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성
 
    if(req.session.userid){
      let userInfo = await user.findOne({
        where:{id :req.session.userid}
      })
       res.status(200).json(userInfo)
    }else{
       res.status(401).send('Unauthorized');
    }
    
  },

};
