import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {db} from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [users,setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Users");

  const createUser = async() => {
    console.log("created User");
    await addDoc(usersCollectionRef, {name:newName,email:newEmail});
  }

  const updateDetails = async(id, name1, email1) =>
  {
    console.log("updated details");
    const userDoc = doc(db, "Users", id);

    const newFields = {name: name1, email: email1};
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async(id) =>
  {
    console.log('deleted user');
    const userDoc = doc(db, "Users", id);

    await deleteDoc(userDoc);
  }

  useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      //setUsers(data.docs
      //console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }

    getUsers();

  }, []);


  return (
    <div className="App">
      <input placeholder="Name" onChange={(event) => {setNewName(event.target.value)}}></input>
      <input placeholder="Email" onChange={(event) => {setNewEmail(event.target.value)}}></input>
      <button onClick={createUser}>Create User</button>

      <p> hello world</p>
      {users.map((user) => {
        console.log(user);
        return (
        <div>
          <h1>
            Name: {user.name}
          </h1> 
          <h1>
            Email: {user.email}
          </h1>
          <input placeholder="New Name" onChange={(event) => {setNewName(event.target.value)}}></input>
          <input placeholder="New Email" onChange={(event) => {setNewEmail(event.target.value)}}></input>
          <button onClick={() => {updateDetails(user.id, newName, newEmail)}}> Update Name/Email</button>
          <button onClick={()=>{deleteUser(user.id)}}>Delete User</button>
        </div>
        )
        })}
    </div>
  );
}

export default App;
