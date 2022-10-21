import React, { useState } from 'react'
import Card from './Card';
import '../App.css'
import { Modal, ModalHeader, ModalBody, Input, Label, Button } from "reactstrap"
import { MoreHorizontal } from 'react-feather';
import { useSelector } from "react-redux";

//column .... 
const Board = (props) => {

    const searchText = useSelector(state => state.searchRed);
    const { _id, title, cards } = props.board; //id - boardId.
    // console.log("Board.js list_id : ",_id, title,cards);
    const [modal, setModal] = useState(false)
    const [inputVal, setInputVal] = useState("")

    const addNewTaskHandler = () => {
        setModal(true)
    }

    const inputChangeHandler = (e) => {
        setInputVal(e.target.value)
    }

    const submitHandler = () => {
        props.addCard(inputVal, _id)
        setInputVal("")
        setModal(false)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm mr-2">
                        <h6 className='mt-2 mb-2'> {title} <span className='float-right'>
                            <MoreHorizontal onClick={() => props.removeBoard(_id)} />
                        </span> </h6>

                        {/* cards array here  */}
                        {cards.filter((val) => {
                            if (searchText === "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(searchText.toLowerCase())) {
                                return val
                            }
                        }).map((item, index) => {
                            return <Card key={index}
                                card={item}
                                removeCard={props.removeCard}
                                handleDragEnd={props.handleDragEnd}
                                handleDragEnter={props.handleDragEnter}
                                boardId={_id}
                                updateCard={props.updateCard}
                            />
                        })}
                        <button className="mt-2 mb-2" onClick={addNewTaskHandler}>+Add a card</button>
                    </div>
                </div>

            </div>

            <Modal
                size='sm'
                isOpen={modal}
                toggle={() => setModal(!modal)}
                style={{ backgroundColor: "#919191 !important" }}
            >
                <ModalHeader toggle={() => setModal(!modal)}>Create a Card</ModalHeader>
                <ModalBody>
                    <div>
                        <Label for="card">
                            Card Name
                        </Label>
                        <Input placeholder='Card Name' onChange={inputChangeHandler} />
                        <Button className='mt-2 mb-2 float-right bg-primary' onClick={submitHandler}>Create </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Board