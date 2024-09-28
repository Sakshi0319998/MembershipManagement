// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const Membership = () => {
  const[membership,setMembership] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const navigate =useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/membership')
    .then(result =>{
     if(result.data.Status){
      setMembership(result.data.Result);
     }else{
      alert(result.data.Error)
     }
    })
    .catch(err =>console.log(err))

  }, []);
// eslint-disable-next-line no-unused-vars
const handleDelete=(id) =>{
  axios.delete('http://localhost:3000/auth/delete_membership/${id}')
  .then(result => {
    if(result.data.Status){
      setMembership(membership.filter(e => e.id !== id));
       }else{
      alert(result.data.Error);
  }
})
        //catch(err => console.log(err));

//};

 return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Membership List</h3>
      </div>
      <Link to="/dashboard/add_membership" className="btn btn-success">
        Add Membership
      </Link>
     
      <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                  {
                    Membership.map( e =>(
                      <tr key={e.id}>{ <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                        </tr>}
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.address}</td>
                         <td>
                          <Link 
                          to={`/dashboard/edit_membership/${e.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                          <button 
                          className="btn btn-warning btn-sm" 
                           
                          onClick={() => handleDelete(e.id)}
                          >Delete</button>
                         </td>
                      </tr>
                    ))}
                  
            </tbody>
          </table>
        </div>
);
};
};
  
export default Membership;
