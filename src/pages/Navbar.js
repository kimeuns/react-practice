import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useQuery } from "react-query";

function Navb(){
  let navigate = useNavigate();

  const result = useQuery('name',()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    
    .then((a)=>{ return a.data }
  ),
  { staleTime:2000}
  )
   
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/react-practice/">
            {/* <img
              alt=""
              src={}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "} */}
            mini Project
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate("/react-practice/")}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link>
          </Nav>
            <Nav className="justify-content-end">{result.isLoading? '로딩중' :`반가워요, ${result.data.name} 님`}</Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;