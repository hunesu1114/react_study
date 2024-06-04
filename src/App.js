/*eslint-disable*/
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {createContext, useState} from "react";
import shoesData from "./data";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart";
import {useQuery} from "@tanstack/react-query";


function App() {

    let obj = {
        name: 'kim',
    }

    localStorage.setItem('data', JSON.stringify(obj));
    let data = localStorage.getItem('data');
    console.log(JSON.parse(data));


    let [shoes, setShoes] = useState(shoesData)
    let [stock, setStock] = useState([10, 11, 12]);
    let navigate = useNavigate();

    let result = useQuery({
        queryKey: ['userData'],
        queryFn: () => {
            return axios.get('https://codingapple1.github.io/userdata.json')
                .then((a) => {
                    console.log("요청됨");
                    return a.data;
                })
        },
        staleTime: 2000
    });

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate('/')
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/about')
                        }}>About</Nav.Link>

                    </Nav>
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        {
                            result.isLoading ? '로딩중' : result.data.name
                        }
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<MainPageComponent shoes={shoes} setShoes={setShoes} navigate={navigate}/>}/>
                <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
                <Route path="/about" element={<AboutPage/>}>
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div>위치정보임</div>}/>
                </Route>
                <Route path="/event" element={<EventPage/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비쑤</div>}></Route>
                    <Route path="two" element={<div>생일기념 쿠폰 받기</div>}></Route>
                </Route>
                <Route path="*" element={<div>404 Not Found</div>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>


        </div>
    );
}

function EventPage() {
    return (
        <div>
            <h2>오늘의 이벤트</h2>
            <Outlet></Outlet>
        </div>
    );
}

function AboutPage() {
    return (
        <div>
            <h4>회사 정보임</h4>
            <Outlet></Outlet>
        </div>
    )
}

function MainPageComponent(props) {
    let threeUnitList = [];
    let copy = [...props.shoes];
    let processCnt = 0;
    while (copy.length !== 0) {
        if (processCnt % 3 === 0) {
            let elt = [];
            elt.push(copy[0]);
            copy.splice(0, 1);
            threeUnitList.push(elt);
        } else {
            threeUnitList[threeUnitList.length - 1].push(copy[0]);
            copy.splice(0, 1);
        }
        processCnt = processCnt + 1;
    }
    return (
        <>
            <div className="main-bg"></div>

            <Container>
                {
                    threeUnitList.map((e1, index1) => {
                        return (
                            <Row key={index1}>
                                {
                                    e1.map((e2, index2) => {
                                        return (
                                            <Col key={e2.id} onClick={() => {
                                                props.navigate('/detail/' + e2.id)
                                            }} style={{cursor: "pointer"}}>
                                                <Product shoes={e2} index={index1 * 3 + index2}/>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        )
                    })


                }

            </Container>
            <button className="btn btn-primary" onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((data) => {
                        let temp = [...props.shoes, ...data.data];
                        props.setShoes(temp);
                    })
                    .catch(() => {
                        console.log("실패!");
                    })
            }}>더보기
            </button>
        </>
    );
}

function Product(props) {
    let src = '/img/shoes' + (props.index + 1) + '.jpg';
    console.log(src)
    return (
        <div>
            <img src={process.env.PUBLIC_URL + src} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </div>
    );
}

export default App;
