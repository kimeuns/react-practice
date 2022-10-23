import { Link } from "react-router-dom"

function Card(props){
    return (
        <div className="col-md-3 mx-3" >
          <Link to={`/detail/${props.id}`}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${props.id+1}.jpg`}
              // <img src={process.env.PUBLIC_URL + '/bg-img.png'} width="80%"></img>
              width="80%"
            ></img>
          </Link>
          <h4>{props.shoe.title}</h4>
          <p>{props.shoe.price}</p>
        </div>

    );
}

export default Card;