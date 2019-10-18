import React, { useState } from 'react';
import ReactModal from 'react-modal';
import firebase from 'firebase/app';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const dataChange = () => {
    let rootRef = firebase.database().ref();
    let tempData = [];
    rootRef.on("value", (snapshot) => {
      Object.keys(snapshot.val()).forEach(key => {
        tempData.push(snapshot.val()[key])
      });
      setData(tempData);
    });
  }
  
  if (data.length == 0) {
    dataChange();
  }

  return (
    <div className="container">
      <Header content="Halloween Secret Santa" />
      <div className="d-flex flex-wrap">
        <Cards cardInfo={data} setData={dataChange} />
        <AddCard setData={dataChange} />
      </div>
      <GenerateCostumes />
      
    </div>);
}

export default App;

const Header = (props) => {
  return (<h1 className="text-center">{props.content}</h1>)
}

const Cards = (props) => {
  return (props.cardInfo).map((info) => {
    return <Card key={info.name} 
      name={info.name} img={info.img} 
      choices={info.choices} completed={info.completed} />;
  });
}

const Card = (props) => {
  
  const submit = () => {
    let inputs = document.querySelectorAll("#" + props.name + " .idea");
    let ref = firebase.database().ref(props.name).child("ideas");
    ref.set({first: inputs[0].value, second: inputs[1].value});
    ref = firebase.database().ref(props.name).child("completed");
    ref.set(true);
    inputs.forEach((input) => {
      input.value = "";
    });
    props.setData();
  }

  const editing = (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">1</span>
        </div>
        <input type="text" className="form-control idea" />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">2</span>
        </div>
        <input type="text" className="form-control idea" />
      </div>
      <div className="d-flex justify-content-space-around">
        <button onClick={submit} className="btn btn-warning">Submit</button>
      </div>
    </>
  );

  return <div id={props.name} className="card profile-card d-flex align-items-center justify-content-center m-2">
    <div className="card-body">
      <div className="profile-img" style={{ backgroundImage: "url(\"/img/" + props.img + "\")" }}>&nbsp;</div>
      <h2 className="card-title text-center">{props.name}</h2> 
      {props.completed ? 
        <>
          <div id="checkmark"><div>&nbsp;</div></div>
          <p className="card-text text-success text-center">Completed</p>
        </> : 
        editing}
    </div>
  </div>
}

const AddCard = (props) => {

  const addCard = () => {
    let name = document.getElementById("name").value;
    let rootRef = firebase.database().ref(name);
    rootRef.set({img: "candy.jpg", completed: false, name: name})
    props.setData();
    name = "";
  }

  return <div className="card profile-card d-flex align-items-center justify-content-center m-3">
    <input id="name" type="text" className="form-control m-3" />
    <h2 onClick={addCard} className="card-title text-center">+</h2> 
  </div>
}

const GenerateCostumes = (props) => {

  return <>
    <input id="password" type="text" className="form-control m-3" />
    <button id="generate" class="btn btn-warning">Generate Costumes</button>
  </>;
}

