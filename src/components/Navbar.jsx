import React from "react"; 
import {useNavigate} from "react-router-dom";
import './Style/Navbar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const usersLink = ['user1', 'user2', 'user3', 'user4']
    return (
        <nav>
            <div>Добро пожаловать</div>
            <ul>
                {usersLink.map((el,ind)=>(
                   <li key={el}><button onClick={() => navigate('/'+el, { replace: false })}>Участник_{ind+1}</button></li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
