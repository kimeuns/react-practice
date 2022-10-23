import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import data from './data'
import { lazy, Suspense, useState , useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";

import Card from './pages/Card';
import Navb from './pages/Navbar'
import axios from 'axios';

// import Detail from './pages/Detail'
// import Cart from './pages/Cart'

const Detail = lazy(() => import('./pages/Detail.js')) 
const Cart = lazy(() => import('./pages/Cart.js')) 

function App() {
  const [shoes, setShoes] = useState(data);
  const [click, setClick] = useState(1);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('watched').length==0){
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])
  
  return (
    <div className="App">
      <Navb />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <Container className="mt-5">
                  <div className="row">
                    {shoes.map(function (shoe, i) {
                      return (
                        <Card shoe={shoe} id={i} key={i} img={shoe.img}></Card>
                      );
                    })}
                  </div>
                  {click < 3 ? (
                    <button
                      className="mt-3"
                      onClick={() => {
                        axios
                          .get(
                            `https://codingapple1.github.io/shop/data${
                              click + 1
                            }.json`
                          )
                          .then((result) => {
                            <div>로딩 끝</div>;
                            setShoes([...shoes, ...result.data]);
                            setClick(click + 1);
                          })
                          .catch(() => {
                            <p>더이상 데이터 없어요</p>;
                          });
                      }}
                    >
                      더보기
                    </button>
                  ) : null}
                </Container>
              </>
            }
          />

          {/* <Route path="/detail" element={<Detail shoes={shoes}/>}/> */}
          <Route path="/detail/:id" element={<Detail shoes={shoes} />}></Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<About />} />
          </Route>
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<div>없는페이지임</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

// function Main(props){

//   return (
    
//   );
// }

export default App;
