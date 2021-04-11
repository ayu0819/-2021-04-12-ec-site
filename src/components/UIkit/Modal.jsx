import React,{useState} from 'react';
import styled from 'styled-components';
import {ModalItem} from '../UIkit';

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    height: 100vh;
`;

const Button = styled.div`
min-width: 100px;
padding: 16px 32px;
border-radius: 4px;
border: none;
background-color: #141414;
color:#fff;
font-size:24px;
cursor:pointer;
`

const Modal = () => {
    const [showModal, setShowModal] = useState(false)
    const openModal = () => {
        setShowModal(prev => !prev)
    }
 return(
     <Container>
         <Button onClick={openModal}>I'm button</Button>
         <ModalItem showModal={showModal} setShowModal={setShowModal} />
     </Container>
 )
}

export default Modal