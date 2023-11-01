const router=require("express").Router();
const {User,validate}=require("../models/user");
const userController = require('../user_update'); 
const bcrypt=require("bcrypt");
const token=require("../token_authentication");
const upload = require('../uploadImage'); 
router.post("/",async(req,res)=>{
    try{
        const {error}=validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "OOPS! A user with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
    }catch(err){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.put('/update/:userId', userController.updateUserData);

router.post('/upload_user',token,upload.single('file'), (req, res) => {
    res.send({"message":'Form data and file received.'});
});

module.exports=router;