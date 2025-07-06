const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth middleware for authentication check valid token or not 
exports.auth = async(req,res,next)=>{
    try
    {
        // fecth token from req and authorize it. here the best way to define and fetch token is Bearer.
        const token = req.cookies.jwt 
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ","");

        console.log("Token of user : ", token);
        if(!token)
        {
            res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        // verify this token 
        try
        {
            // The payload contains the user information (like id, email, accountType) that was included at the time of token creation during login.
            const payload = jwt.verify(token, process.env.JWT_SECRET);
           // Attach the decoded JWT payload to the request object as "req.user".
             // This allows access to user information (like id, email, accountType) in later middleware or routes
            req.user = payload;  //this will pass user info in next middleware or protected route. 
            console.log("User type : ",req.user.accountType);

        }catch(err)
        {
            res.status(500).json({
                success:false,
                message:"Token is invalid brother ",
            })
        }

        // token check karne ke baad it means authenicatioin check karne ke baad , next middleware chalega isliye next() likha he niche ki line me . and ye middleware define he routes ki file me 
        next();
     
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal sever error in auth middleware"
        })   
    }
}

//this middleware for check the which route of a role student can access.
//isStudent and isInstructor middleware use for authorization 
exports.isStudent = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Student")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Student."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Student"
        })
    }
}


exports.isInstructor = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Instructor")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Instructor."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Instructor"
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try
    {
        if(req.user.accountType!=="Admin")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Admin"
            })
        }
        next();

    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Admin"
        })
    }
}


/**
 
🔐 JWT Auth Flow for Protected Routes (Step by Step)


 [1] User Login Karega ➝ JWT Token generated hoga  ➝Server sent this token to client(fronted) via  (cookie or token)
           --->hamne es token ke saath user ki info bhi send kar di he without password.

[2] Client sends request to protected route ➝ Token sent via header/cookie. 
this is protected route ----->        router.put("/changePassword", auth, changePassword);

[3] Middleware (auth.js):-->ye user ki identiti check karega verify the token . and token ko decode (payload ) karega . and es decode(payload) ko jo proteced routes ki req aayi thi usme add kar dega via ----> req.user= decode; jisse next middleware and routes ese use kar ppaye.
      ✓ Gets token
      ✓ Verifies token
      ✓ Adds decoded payload to req.user

[4] Route handler:
      ✓ Accesses req.user
      ✓ Fetches more data if needed
      ✓ Sends response












 */