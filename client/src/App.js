import './App.css';
import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css'; //second way to import bootstrap..
import { Modal, ModalHeader, ModalBody, Input, Label, Button } from "reactstrap"

import Header from './components/Header';
import Board from './components/Board';

function App() {
  const [boards, setBoards] = useState([
  ])
  const [modal, setModal] = useState(false)
  const [inputVal, setInputVal] = useState("")
  const [target, setTarget] = useState({
    cid: "",
    bid: ""
  })

  const addToAnotherListHandler = () => {
    setModal(true)
  }

  const inputChangeHandler = (e) => {
    // console.log("Input : ", e.target.value);
    setInputVal(e.target.value)
  }

  const submitHandler = () => {
    // console.log("clicked submit",inputVal);
    // -- calling addBoard on click of create in add another list create button --- 
    addBoard(inputVal)
    setInputVal("")
    setModal(false)
  }


  // --- Add new Card to board => onClick = add to card --- 
  const addCard = (title, list) => {

    console.log("title get from params  addCard : ", title, list);
    fetch("https://kan-ban.online/api/v1/card", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, list }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("App.js addCard : ", data.card);
        // -- find the board in which we have to push our card -- 
        const index = boards.findIndex((item) => item._id === list);
        if (index < 0) return;

        // -- copy the boards and make change in boards array --
        const tempBoards = [...boards];
        tempBoards[index].cards.push(data.card)
        setBoards(tempBoards);
      });

    // const card = {
    //   id: uuidv4(),
    //   title,
    //   created_At: new Date(),
    //   update_At: ""
    // }

    // // -- find the board in which we have to push our card -- 
    // const index = boards.findIndex((item) => item._id === bid);
    // if (index < 0) return;

    // // -- copy the boards and make change in boards array --
    // const tempBoards = [...boards];
    // tempBoards[index].cards.push(card)
    // setBoards(tempBoards);
  }

  //-- Remove Card from Board -- 
  const removeCard = (cid, bid) => {
    // console.log("cid && bid " , cid , bid );

    fetch(`https://kan-ban.online/api/v1/card/${cid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("App.js removeCard : ", data);
        alert("deleted !!")
        const bIndex = boards.findIndex((item) => item._id === bid);
        if (bIndex < 0) return;

        const cIndex = boards[bIndex].cards.findIndex((item) => item._id === cid);
        if (cIndex < 0) return;

        const tempBoards = [...boards];
        tempBoards[bIndex].cards.splice(cIndex, 1);
        // console.log(tempBoards.map(item => `${item}`));
        setBoards(tempBoards)
      });

    // const bIndex = boards.findIndex((item) => item._id === bid);
    // if (bIndex < 0) return;

    // const cIndex = boards[bIndex].cards.findIndex((item) => item._id === cid);
    // if (cIndex < 0) return;

    // const tempBoards = [...boards];
    // tempBoards[bIndex].cards.splice(cIndex, 1);
    // console.log(tempBoards.map(item => `${item}`));
    // setBoards(tempBoards)
  }

  // -- Update card on click --
  const updateCard = (bid, cid, title) => {
    console.log(" bid && cid : ", bid, cid, title);//

    fetch(`https://kan-ban.online/api/v1/card/${cid}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("App.js data addBoard: ", data);
        const index = boards.findIndex((item) => item._id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item._id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].cards[cardIndex].title = title
        setBoards(tempBoards);
      });
      // const index = boards.findIndex((item) => item._id === bid);
      // if (index < 0) return;
  
      // const tempBoards = [...boards];
      // const cards = tempBoards[index].cards;
  
      // const cardIndex = cards.findIndex((item) => item._id === cid);
      // if (cardIndex < 0) return;
  
      // tempBoards[index].cards[cardIndex].title = title
      // setBoards(tempBoards);

  };

  // -- Add a new Board by using name 
  const addBoard = (title) => {

    // console.log("title get from params ", title);
    fetch("https://kan-ban.online/api/v1/list", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("App.js data addBoard: ", data.list);
        setBoards([
          ...boards,
          data.list
        ]);
      });
  };

  // -- Remove Board using Board Id
  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    setBoards(tempBoards);
  }

  // -- We need to set the drag start cid and bid  -- 
  const handleDragEnter = (cid, bid) => {
    console.log("cid and bid , handleDragEnter : ", cid,bid);
    setTarget({
      cid,
      bid
    })
  }

  // -- Drop to other dragover  cid and bid  -- 
  const handleDragEnd = (cid, bid) => {
    console.log("cid , bid : handleDragEnd ", cid,bid);
    let source_bIndex, source_cIndex, target_bIndex, targte_cIndex;

    source_bIndex = boards.findIndex((item) => item._id === bid)
    if (source_bIndex < 0) return;

    source_cIndex = boards[source_bIndex].cards.findIndex((item) => item._id === cid)
    if (source_cIndex < 0) return;

    target_bIndex = boards.findIndex((item) => item._id === target.bid);
    if (target_bIndex < 0) return;

    targte_cIndex = boards[target_bIndex].cards.findIndex(item => item._id === target.cid)
    if (targte_cIndex < 0) return;


    const tempBoards = [...boards];
    const tempCard = tempBoards[source_bIndex].cards[source_cIndex];

    tempBoards[source_bIndex].cards.splice(source_cIndex, 1);
    tempBoards[target_bIndex].cards.splice(targte_cIndex, 0, tempCard);

    setBoards(tempBoards)
  }

  useEffect(() => {
    fetch("https://kan-ban.online/api/v1/lists")
      .then(response => response.json())
      .then(data => {
        // console.log("app.js data.lists : ", data.lists)
        setBoards(data.lists);
      })
  }, [boards])

  return (
    <>
      <Header />
      <div className='container mt-4'>
        <div className='d-flex'>
          {boards.map((item, index) => {
            return <Board key={index} board={item}
              removeBoard={removeBoard}
              removeCard={removeCard}
              updateCard={updateCard}
              addCard={addCard}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
            />
          })}
          <div className='btn-wrapper'>
            <button onClick={addToAnotherListHandler}>+Add another list</button>
          </div>
        </div>
      </div>

      {/* Modal for create a new board */}
      <Modal
        size='sm'
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{ backgroundColor: "#919191 !important" }}
      >
        <ModalHeader toggle={() => setModal(!modal)}>Create a New Board</ModalHeader>
        <ModalBody>
          <div>
            <Label for="boardName">
              Board Name
            </Label>
            <Input placeholder='Board Name' onChange={inputChangeHandler} />
            <Button className='mt-2 mb-2 float-right bg-primary' onClick={submitHandler}>Create </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default App;
