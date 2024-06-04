import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {increaseCount} from "../store/cartSlice";
import {increaseAge} from "../store/userSlice";

function Cart() {

    let user=useSelector((state=>{
        return state.user;
    }))
    let cart = useSelector((state) => {
        return state.cart;
    });

    let dispatch = useDispatch();

    return (
        <div>
            <h6>{user.name} {user.age} 의 장바구니</h6>
            <button onClick={()=>{
                dispatch(increaseAge(1));
            }}>age+1</button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                    {
                        cart.map((e)=>{
                            return (
                                <>
                                    <tr>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(increaseCount(e.id))
                                    }}>+</button></td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </tbody>
            </Table>
            {
                cart.map((e)=>{
                    return e.name+'/'
                })
            }
        </div>
    )
}



export default Cart;