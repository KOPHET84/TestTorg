import React, {useState, useCallback,useEffect} from "react";
import NavBar from "./Navbar";
import Verify from "./Verify";
import socket from './socket';
import Table from './Table';

const Home = ()=>{
    const [adminId, setAdminId] = useState(null);
    const handleVerify = useCallback((answer, Id) => {
        if (answer === true) {
          setAdminId(Id);
        } else {
          setAdminId(null);
        }
      }, []);
    
      useEffect(() => {
        socket.on('backVerify', handleVerify);
        return () => {
          socket.off('backVerify', handleVerify);
        };
      }, [handleVerify]);

    return (

        adminId ? (
      <Table isAdmin={adminId}/>
        ) :(
           <>
        <NavBar/>
        <Verify/>
        </> 
        )

    )
}
export default Home;
