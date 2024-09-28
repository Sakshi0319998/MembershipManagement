
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/login';
import {BrowserRouter,Routes,Route}from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Category from './Components/Category';
import Profile from './Components/Profile';
import Membership from './Components/Membership';
import AddCategory from './Components/AddCategory';
import AddMembership from './Components/AddMembership';
import EditMembership from './Components/EditMembership';
import Start from './Components/start';
import MembershipLogin from './Components/MembershipLogin';
 
//import Logout from './Logout';
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Start' element={< Start/>}></Route>
      <Route path='/auth/adminlogin' element={<Login/>}></Route>
      <Route path='/auth/membership_login' element={<MembershipLogin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='' element={< Home />}></Route>
      <Route path='/dashboard/membership' element={< Membership/>}></Route>
      <Route path='/dashboard/category' element={< Category />}></Route>
      <Route path='/dashboard/profile' element={< Profile />}></Route>
      <Route path='/dashboard/add_category' element={< AddCategory />}></Route>
      <Route path='/dashboard/add_membership' element={< AddMembership />}></Route>
      <Route path='/dashboard/edit_membership/:id' element={< EditMembership />}></Route>
      
      
      </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
