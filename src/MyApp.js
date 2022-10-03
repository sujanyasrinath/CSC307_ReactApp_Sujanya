
import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

  function removeOneCharacter (index) {
    var id = characters[index].id;
    makeDeleteCall(id).then( response => {
      if(response && response.status === 204){
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }

    });
    
    
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
        setCharacters([...characters, result.data.user]);
    });
  }
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:3200/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }
  
  async function makePostCall(person){
    try {
      const response = await axios.post('http://localhost:3200/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id){
    try {
      const response = await axios.delete('http://localhost:3200/users/'+ id);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;




