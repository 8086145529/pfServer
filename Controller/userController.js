const users = require('../Models/userSchema')

// register// oru user register cheyunna samayath nadkkunna karyangal
exports.register = async(req,res)=>{
    console.log('Inside register controller function');
    // res.status(200).json("Register Request received")
    const {username,email,password} = req.body
    try{
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
        res.status(401).json(`Register API Failed : ${err}`)
    }

}

// login

exports.login = async(req,res)=>{
    console.log('Inside register controller function');
    const {email,password} = req.body
       try{
         const existingUser = await users.findOne({email,password})
        if(existingUser){
          res.status(200).json(existingUser); 
        }else{
             res.status(406).json("Incorrect email or password");
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error: ${err}`)
    }
    
}

