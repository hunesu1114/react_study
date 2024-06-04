import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../store/cartSlice";
/*let YellowBtn = styled.button`
    background: ${props => props.bg};
    color: ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px;
`;

let newBtn = styled.button(YellowBtn)`
    //...
`

let Box = styled.div`
    background: grey;
    padding: 20px;
`;*/

function Detail(props) {

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [orderCnt, setOrderCnt] = useState('0');
    let [tab, setTab] = useState(0);

    let {id} = useParams();
    let navigate = useNavigate();

    let cart = useSelector((state)=>{
        return state.cart;
    });
    let dispatch = useDispatch();

    // HTML 렌더링 이후에 동작함 => 오래 걸리는 작업들 여기서 처리하는게 좋음
    // EX) 어려운 연산 / 서버에서 데이터 가져오는 작업 / 타이머 장착하는거 등등
    useEffect(() => {
        let timer = setTimeout(() => {
            setAlert(false);
        }, 2000);

        // clean up function
        return ()=>{
            clearTimeout(timer);
        }
    },[]);

    useEffect(() => {

        if (isNaN(orderCnt)===true) {
            if (orderCnt !== '') {
                window.alert('그러지 마라');
            }
        }
        if (orderCnt === '') {
            setOrderCnt('0');
        }
    }, [orderCnt]);

    let src = 'https://codingapple1.github.io/shop/shoes' + (Number.parseInt(id) + 1) + '.jpg';
    let object = props.shoes.find((e) => {
        return e.id == id
    })
    return (
        <div className="container">
            {
                alert == true
                    ? <div className="alert alert-warning" id='discount-alert'>
                        2초 이내 구매시 할인
                    </div>
                    : null
            }

            {count}
            <button onClick={() => {
                setCount(count + 1)
            }}>버튼
            </button>
            {/*<YellowBtn bg="blue">button</YellowBtn>*/}
            {/*<YellowBtn bg="orange">button</YellowBtn>*/}

            <div className="row">
                <div className="col-md-6">
                    <img src={src} width="100%"/>
                </div>
                <div className="col-md-6">
                    <input onChange={(e) => {
                        let cnt = e.target.value;
                        if (cnt === '') {
                            setOrderCnt('0');
                        }
                        setOrderCnt(cnt);
                    }}/>
                    <h4 className="pt-5">{object.title}</h4>
                    <p>{object.content}</p>
                    <p>{object.price}</p>
                    <button className="btn btn-danger" onClick={() => {
                        let param = {
                            id: object.id,
                            name: object.title,
                            count: 1
                        }
                        dispatch(addItem(param));
                        window.alert('주문 담기 완료')
                        navigate('/cart');
                    }}>주문하기
                    </button>
                </div>


            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item onClick={() => {
                    setTab(0);
                }}>
                    <Nav.Link eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => {
                    setTab(1);
                }}>
                    <Nav.Link eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => {
                    setTab(2);
                }}>
                    <Nav.Link eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabComponent tab={tab} shoes={props.shoes}/>


        </div>
    );
}

// props 없이 쓰는 법
function TabComponent({tab, shoes}) {

    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(()=>{
            setFade('end')
        },100);
        return ()=>{
            setFade('');
        }
    }, [tab]);

    return (
        <div className={'start '+ fade}>
            {[<div>{shoes[0].title}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][tab]}
        </div>
            );
}





export default Detail;