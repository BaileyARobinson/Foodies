import { NavLink, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";



function Navigation() {

  const user = useSelector((state) => state.session)
 
  const navigate = useNavigate()

  return (
    <div className='nav-bar'>
      
        <NavLink to="/">
          <img className='nav-logo' src="/pancakeLogo.jpeg"/>
        </NavLink>
      
        <div className='right-side-nav'>
          {user?.user?.id ? <button className='create-a-dish' onClick={()=> navigate('/dishes/new')}>Create a New Dish</button> : <div className='stand-in-button'></div>}
          
           <ProfileButton className='profile-button' />
        </div>
      
        
      
    </div>
  );
}

export default Navigation;
