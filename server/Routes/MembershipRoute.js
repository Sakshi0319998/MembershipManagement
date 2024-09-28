import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Router } from "express";
import  membershipRouter  from "../Routes/MembershipRoute.js";



Router.post("/membership_login", (req, res) => {
    const sql = "SELECT * from membership where email = ? ";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare( req.json.password,result[0].password,(err, response)=>{
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response){
                const email = result[0].email;
                const token = jwt.sign(
                  { role: "membership", email: email },
                  "membership_secret_key",
                  { expiresIn: "id" }
                );
                res.cookie('token',token)
          return res.json({ loginStatus: true });
        
            }
        })
       
         
      }else{
          return res.json({ loginStatus: false, Error: "wrong email or password " });
      }
    });
  });

  export {Router as MembershipRouter};
