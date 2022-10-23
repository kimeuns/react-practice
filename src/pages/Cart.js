import { useState , memo, useMemo} from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount, deleteItem } from "../store/cartSlice";
import {Button} from 'react-bootstrap';

let Child = memo (function() {
  console.log('재렌더링됨')    
  return <div>자식임</div>;
})

function test(){
  return <div>반복문 10억번 돌린결과</div>
}



function Cart() {
  let { user, cart, stock } = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  useMemo(()=>{return test()}, [count]) 
  //cart가 처음 렌덜이 될때만 사용, useEffect와 똑같다.
  //useEffect의 경우 return값이 끝난 후에 실행 but, useMemo의 경우 함수가 렌더링될 때 함께 실행
  
  return  (
    <div>
      
      <div>
        {user.age}세 {user.name}의 장바구니
      </div>
      <button
        onClick={() => {
          dispatch(increase(1));
        }}
      >
        나이 ++
      </button>
      <Table bordered>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품명</th>
            <th>주문 수량</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>
                  <div>
                    {v.count}
                  </div>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      dispatch(addCount(v.id));
                    }}
                  >
                    +
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(deleteItem(v.id));
                    }}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
