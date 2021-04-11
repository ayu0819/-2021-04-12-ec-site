import React,{useState} from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root')

const TestButtonModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
 return(

<div>
<button onClick={() => setModalIsOpen(true)}>Open Modal</button>
    <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} 
           onRequestClose={() => setModalIsOpen(false)}
           style={
            {
              overlay: {
                backGroundColor: 'grey'
              },
              content: {
                color: 'orange'
            }
           }
          }
           >
      <h2>Modal Title</h2>
      <p>modal text</p>
      <div>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </div>
    </Modal>
</div>
 )
}

export default TestButtonModal;