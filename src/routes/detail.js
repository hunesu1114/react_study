import {useParams} from "react-router-dom";

function DetailPageComponent(props) {

    let {id} = useParams();
    let src = 'https://codingapple1.github.io/shop/shoes' + (Number.parseInt(id) + 1) + '.jpg';
    let object = props.shoes.find((e) => {
        return e.id == id
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={src} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{object.title}</h4>
                    <p>{object.content}</p>
                    <p>{object.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default DetailPageComponent;