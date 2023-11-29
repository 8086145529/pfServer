const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
// register// oru user register cheyunna samayath nadkkunna karyangal and frontendilek enthokke response kodukkanam
exports.register = async(req,res)=>{
    console.log('Inside register controller function');
    // res.status(200).json("Register Request received")
    const {username,email,password} = req.body // means requestinte bodyil ninnum user kodutha datas extract cheyth edukkuka
    try{// api call cheyumbol error varunnathine
        const existingUser = await users.findOne({email})// findOne 2 karyangal mathrame return cheyannula possibility ollu.1.aayalude full detail(an object) 2.Angane oral illenkil null ennum return cheyum(MongoDB compassil kandath pole) // users.findOne({email}) means both keyname and value name are same.i.e {email:email}.ivide email mathram use cheyan karanam,user kodukkuna unique aayittula ore oru data mathrame ollu ath email aan.so existing user aano enn kand pidikan,ith use cheythal mathi.but loginteth ithupole existing user aano enn check cheyan email and password venam.
        if(existingUser){ // so existingUser undenkil,i.e already oru user with ee object detail, MongoDBil stored aan,i.e already ayal register button click  cheyth account create cheythittund
            res.status(406).json("Account already exists!!! Please Login...")// 400 series status code means client error, 406 means 
        }else{ //findOne kodukkumbol null return cheyumbol.means angane oru aal already register cheythittila,i.e angane oralude data mongodbil illa.so ayalude data insert cheyanam
            const newUser = new users({ // data insert cheyumbol,aa modelinn anusarich aale add cheyanam.i.e aa modelilinn oru object create chayanam i.e new users
                username,email,password,github:"",linkedin:"",profile:"" // userSchemail koduthirikunna athe orderil kodukkanam ivide key value pairs kodukkanam
            })
            await newUser.save()
            res.status(200).json(newUser)// mean register successfull aayenkil ,response aayitt newuserine kodukkan paranju kodukkunu
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed : ${err}`)// means 401 error vannal athinte meaning ee server folderil aan error ennan
    }

}

// login

exports.login = async(req,res)=>{
    console.log('Inside login controller function');
    const {email,password} = req.body
       try{
         const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
          res.status(200).json({
            existingUser,token // means frontendilek response aayitt server existingUserine kodukkunathinte koode token koodi kodukkunu
        }); 
        }else{
             res.status(406).json("Incorrect Email or Password");
        }
    }
    catch(err){
        res.status(401).json(`Login API Failed , Error: ${err}`)
    }
    
}

// editUser
exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
}