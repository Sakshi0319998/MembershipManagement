// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditMembership = () => {
   
  const { id } = useParams();
  // eslint-disable-next-line no-undef
  const [membership, setMembership] = useState({
    name: "",
    email: "",
    address: "",
    category_id: "",
   
  });
  // eslint-disable-next-line no-undef
  const[category,setCategory]= useState([])
   
  const navigate = useNavigate()
  // eslint-disable-next-line no-undef
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/category')
    .then(result =>{
     if(result.data.Status){
      setCategory(result.data.Result);
     }else{
      alert(result.data.Error)
     }
    })
    .catch(err =>console.log(err))
    
    axios.get('http://localhost:3000/auth/membership/'+id)
     
    .then(result =>{
     setMembership({
         
        ...membership,
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        address: result.data.Result[0].address,
        category_id: result.data.Result[0].category_id,
     }) 

    
    }).catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
const handleSubmit =(e)=>{
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_employee'/+id,membership)
    .then(result =>{
       if(result.data.status){
        navigate('/dashboard/membership')
       }else{
        alert(result.data.Error)
       }

    }).catch(err=>console.log(err))
}
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border ">
        <h3 className="text-center">Edit Membership</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={membership.name}
              onChange={(e) =>
                setMembership({ ...membership, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              value={membership.email}
              onChange={(e) =>
               
                setMembership({ ...membership, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Addresss
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              autoComplete="off"
              value={membership.address}
              onChange={(e) =>
                setMembership({ ...membership, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select">
              onChange=
              {(e) =>
                setMembership({ ...membership, category_id: e.target.value })
              }
              {category.map((e) => {
                // eslint-disable-next-line react/jsx-key
                return <option value={e.id}>{e.name}</option>;
              })}
            </select>
          </div>
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Membership
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMembership;
