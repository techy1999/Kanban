import React, { useState, useEffect } from 'react'
import './Card.css'
import { Trash, Edit2 } from 'react-feather';
import { Modal, ModalHeader, ModalBody, Input, Label, Button } from "reactstrap"

//task ...
const Card = (props) => {

  // console.log(props);//boardId-id, card-id
  const [inputVal, setInputVal] = useState(props.card.title)
  const [updateModal, setUpdateModal] = useState(false)
  const { _id } = props.card;
 
  const editHandler = () => {
    setUpdateModal(true)
    // props.updateCard()
  }

  const handleUpdate = () => {
    props.updateCard(props.boardId, props.card, inputVal)
    setUpdateModal(false);
  }

  useEffect(() => {
    fetch(`https://kan-ban.online/api/v1/card/${props.card}`)
      .then(response => response.json())
      .then(data => {
        //console.log("Card.js data " ,data)  
        if(data.message !== "No card found"){
          setInputVal(data.card.title)
        }
       
      })
  }, [props.card]) //Added props.card 

  return (
    <div className='card-wrapper mt-2' draggable="true"
      onDragEnd={() => props.handleDragEnd(props.card, props.boardId)}
      onDragEnter={() => props.handleDragEnter(props.card, props.boardId)}
    >
      <div className="card" style={{ height: "50px" }}>
        <div className="card-body">
          {inputVal}
          <span className='float-right trash-edit-icon' >
            <Trash onClick={() => props.removeCard(props.card, props.boardId)} />
            &nbsp;&nbsp;
            <Edit2 onClick={editHandler} />
          </span>
        </div>
      </div>

      <Modal
        size='sm'
        isOpen={updateModal}
        toggle={() => setUpdateModal(!updateModal)}
        style={{ backgroundColor: "#919191 !important" }}
      >
        <ModalHeader toggle={() => setUpdateModal(!updateModal)} >Update Card</ModalHeader>
        <ModalBody>
          <div>
            <Label for="card">
              Card Name
            </Label>
            <Input placeholder='Card Name' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <Button className='mt-2 mb-2 float-right bg-primary' onClick={handleUpdate} >Update </Button>
          </div>
        </ModalBody>

      </Modal>
    </div>
  )

}

export default Card