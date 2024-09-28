import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
//import  MembershipRouter  from "./Routes/MembershipRoute.js";



const router = express.Router();
const adminRouter = express.Router();

adminRouter.get('/',(req,res) => { 
  res.send("Admin Route");
});

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin where email = ? and password = ? ";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "id" }
      );
        res.cookie('token',token)
        return res.json({ loginStatus: true, Error: "Query error" });
      
    }else{
        return res.json({ loginStatus: false, Error: "wrong email or password " });
    }
  });
});

router.get('/category',(req,res)=>{
  const sql="SELECT * FROM category";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status: false,Error:"Query Error"})
      return res.json({Status:true, Result:result})

  })
})

router.post('/add_category',(req,res)=> {
  const sql ="INSERT INTO category,('name') VALUES (?)"
  con.query(sql,[req.body.category],(err,result)=>{
    if(err) return res.json({Status: false,Error:"Query Error"})
      return res.json({Status:true})
  })
})
  router.post('/add_membership',(req,res)=>{
    const sql ="INSERT INTO membership\('name','email','password','address','category_id')\ VALUES (?)"
     bcrypt.hash(req.body.password.tostring(),10,(err,hash)=>{
      if(err) return res.json({Status: false,Error:"Query Error"})
        const values =[
      req.body.name,
    req.body.email,
    hash,
    req.body.address,
    req.body.image,
    req.body.category_id
]
   con.query(sql,[values],(err,result)=>{
    if(err) return res.json({Status: false,Error:"Query Error"})
      return res.json({Status:true})

   })

     })
  })

  router.get('/membership',(req,res)=>{
    const sql="SELECT * FROM membership";
    con.query(sql,(err,result)=>{
      if(err) return res.json({Status: false,Error:"Query Error"})
        return res.json({Status:true, Result:result})
  
    })
  })

  router.get('/membership/:id',(req,res)=>{
    const id = req.params.id;
    const sql="SELECT * FROM membership WHERE id =?";
    con.query(sql,[id],(err,result) => {
      if(err) return res.json({Status: false,Error:"Query Error"})
        return res.json({Status:true, Result:result})
  
    })

  })
  router.put('/edit_membership/:id',(req,res)=>{
    const id = req.params.id;
    const sql =`UPDATE membership 
    set name= ?, email= ?, address=?, category_id= ?
    where id =? `
  
     const values =[
      req.body.name,
    req.body.email,
    req.body.address,
    req.body.category_id
     ]
    con.query(sql,[...values,id],(err,result) => {
      if(err) return res.json({Status: false,Error:"Query Error"+err})
        return res.json({Status:true, Result:result})
  
    })
  })   
  router.delete('/delete_membership/:id',(req,res)=>{
    const id=req.params.id;
    const sql="delete from membership WHERE id = ?"
    con.query(sql,[id],(err,result) => {
      if(err) return res.json({Status: false,Error:"Query Error"+err})
        return res.json({Status:true, Result:result})
    })
  })

  router.get('/admin_count',(req,res) =>{
    const sql="select count(id) as admin from admin";
    con.query(sql,(err,result)=>{
      if(err)return res.json({Status: false, Error:"Query Error"+err})
        return res.json({Status: true,Result: result})
    })
  })

  router.get('/membership_count',(req,res) =>{
    const sql="select count(id) as membership from membership";
    con.query(sql,(err,result)=>{
      if(err)return res.json({Status: false, Error:"Query Error"+err})
        return res.json({Status: true,Result: result})
    })
  })

  router.get('/dashboard/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status: true})
    res.send("Logged out successfully");
  });
  
  
export { router as adminRouter };
