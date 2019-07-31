import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { Card, Icon, Image, Table, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import ProfileTable from './ProfileTable';


const Container = styled.div`
display: flex;
justify-content: center;

`
const Body = styled.div`
flex-direction: column;

`
// const Nav = styled.nav`
// background-color: #99AAE7;
// font-family: "helvetica", sans serif;
// a {color:#FFFF;}
// `

function Profile(props) {
    const [currentUser, setCurrentUser] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = e => {
      setIsEditing(!isEditing);
    };

    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let localId = JSON.parse(localStorage.getItem('id'))
        axios
           .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
              headers: {
                Authorization: token
              }
             })
            .then( res => {
            console.log(res)
            setCurrentUser(res.data)
          })
            .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
        },[])

    return (
      <>
        {/* <Nav>
          <a href=''>Home</a>
          <a href=''>About Us</a>                   
        </Nav> */}
        <Container>
       
      { !isEditing ? (
          <Body>         
        <i class="pencil alternate icon" onClick={handleEdit}></i>
        <Card header={'jessica'} image={'https://www.argospetinsurance.co.uk/assets/uploads/2017/10/pexels-photo-416160.jpeg'} meta={'89145'} description={'buildweek@gmail.com'} />
        <ProfileTable /> 
        <Modal header={'Profile'} image={currentUser.image} description={handleEdit} deny={'Close'} positive={'Submit'}/>
          </Body> 
        ) : <EditProfile
            handleEdit={handleEdit}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
             />
        }
       </Container>     
      </>
    )

  }

  export default Profile;

