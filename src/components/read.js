import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import 'react-bootstrap'
import Pagination from "./pagination";
//import {Data} from "./db.json";

export default function Read() {
 // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(3);

   
 
  

  const [APIData, setAPIData] = useState([]);
  const [search, setSearch] = useState('')

  console.log(search)
  useEffect(() => {
    axios
      .get(`http://localhost:3004/posts`)
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox,diponibility } = data;
    
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
    localStorage.setItem("Disponibility Value", diponibility);
  };

 
  //const [activeBtn, setActiveBtn] = useState("none");

  //handleLike

  
 
    
 
  

  //handleDislike

  

  const getData = () => {
    axios
      .get(`http://localhost:3004/posts`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:3004/posts/${id}`)
      .then(() => {
        getData();
      });
  };

 /* const updateDisponible = (id) => {
    axios.patch(`http://localhost:3004/posts/${id}`, {
      
  }).then(() => {
      history.push('/read')
  })

  }

  const updatePasDisponible = (id) => {
    axios.patch(`http://localhost:3004/posts/${id}`, {
      checkbox
  }).then(() => {
      history.push('/read')
  })

  } */

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = APIData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

 

 const UpdateDisponibility = (id) => {
    //const [diponibility, setdisponibility] = useState(false);
    
    axios.patch(`http://localhost:3004/posts/${id}`, {
       
    }).then(() => {
       // history.push('/read')
    })
} 

 
  return (
      
        <div>
          <input type = "search" onChange={(e)=> setSearch(e.target.value )} placeholder="Rechercher" className="search"/>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checkbox Value</Table.HeaderCell>
            <Table.HeaderCell>Disponibilité</Table.HeaderCell>
           
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentPosts.filter((data)=>{
            return search.toLowerCase() === '' ? data: data.firstName.toLowerCase().includes(search)
          }).map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "disponible" : "Pas disponible"}
                </Table.Cell>
                <Table.Cell>
                   
                    <Button onClick={() => setData(data)}>
                    <Icon color='green'>
                    <i aria-hidden="true" class="thumbs up icon"></i>
                    </Icon>
                    </Button>
                  </Table.Cell>
                  
               
                <Link to="/update">
                  <Table.Cell>
                    <Button color='green' onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button color='red' onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={APIData.length}
        paginate={paginate}
      />
      
    </div>
  );

}
