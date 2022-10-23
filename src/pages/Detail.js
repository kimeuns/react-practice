import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { addItem } from "store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const TestBox = styled.div`
  width: 100%;
  height: 50px;
  background: yellow;
  margin: auto;
`;


function Detail(props) {

  let dispatch = useDispatch();
  const [fade, setFade] = useState("");
  const [box, setBox] = useState(true);
  const [num, setNum] = useState("");
  const [tab, setTab] = useState(0);

  const { id } = useParams();
  let shoe = props.shoes.find((x) => x.id == id);

  // localStorage.setItem('obj', JSON.stringify({id:shoe.id, title:shoe.title, content:shoe.content, price:shoe.price}));
  useEffect(()=>{

    let view = localStorage.getItem('watched')
    view = JSON.parse(view)
    
    view.push(shoe.id)
    view = new Set(view)
    view = Array.from(view)
    localStorage.setItem('watched', JSON.stringify(view))
  
  }, [])

  useEffect(() => {
    //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
    // 여기는 그 다음에 실행됨 (2)
    let a = setTimeout(() => {
      setBox(false);
    }, 2000);
    return () => {
      //이 안이 먼저 실행됨 (1) *clean up function
      //이전에 짰던 코드를 제거할 때 활용 (이 전의 코드가 계속 반복되는 것을 방지하기 위해서)
      //타이머 제거, socket 연결 요청 제거, ajax 요청 중단 등에 활용.
      //컴포넌트 unmount 시에도 clean up function 안에 함수가 1회 실행됨.
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 150);
    return () => {
      setFade("");
    };
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      alert("그러지 마세요!");
    }
  }, [num]);

  return (
    <>
      <div className={`start ${fade}`}>
        {/* <input onChange={(e)=>{setNum(e.target.value)}}></input> */}

        {box == true ? <TestBox>2초 내 구매시 할인</TestBox> : null}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`}
                width="100%"
              ></img>
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{shoe.title}</h4>
              <p>{shoe.content}</p>
              <p>{shoe.price}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(addItem(shoe));
                }}
              >
                주문하기
              </button>
            </div>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link
                  eventKey="link0"
                  onClick={() => {
                    setTab(0);
                  }}
                >
                  Active
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link1"
                  onClick={() => {
                    setTab(1);
                  }}
                >
                  Option 2
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link2"
                  onClick={() => {
                    setTab(2);
                  }}
                >
                  {" "}
                  Disabled{" "}
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <TabContent shoe={shoe} tab={tab}></TabContent>
          </div>
        </div>
      </div>
    </>
  );
}

function TabContent({ tab, shoe }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 500);
    return () => {
      setFade("");
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {[<div>{shoe.content}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
