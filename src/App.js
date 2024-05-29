/*eslint-disable*/
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {useState} from "react";
import shoesData from "./data";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import DetailPageComponent from "./routes/detail";

function App() {

    let [shoes, setShoes] = useState(shoesData)
    let navigate = useNavigate();


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
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<MainPageComponent shoes={shoes}/>}/>
                <Route path="/detail/:id" element={<DetailPageComponent shoes={shoes}/>}/>
                <Route path="/about" element={<AboutPage/>}>
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div>위치정보임</div>}/>
                </Route>
                <Route path="/event" element={<EventPage/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비쑤</div>}></Route>
                    <Route path="two" element={<div>생일기념 쿠폰 받기</div>}></Route>
                </Route>
                <Route path="*" element={<div>404 Not Found</div>}/>
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
    return (
        <>
            <div className="main-bg"></div>

            <Container>
                <Row>
                    {
                        props.shoes.map((e, index) => {
                            return (
                                <Col>
                                    <Product shoes={e} index={index}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
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
