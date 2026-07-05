import { Card, Button, Row, Col } from 'react-bootstrap';
import "@/assets/css/login.css"
import freshImg from '@/assets/imgs/login.jpg'
import logo from '@/assets/imgs/veryfrais.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '@/plugins/store/thunks/authThunks';
import { asynCartWithDB } from '@/plugins/store/thunks/cartThunk.js';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, lodding, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (status == "succeeded") {
            navigate('/')
        }
    }, [status]);

    const loginAction = () => {
        dispatch(loginUser({ email: email, password: password })).unwrap().then(() => {
            console.log('Dispatching cart sync after login');
            dispatch(asynCartWithDB());
        })
    }


    return (
        <>

            <div className="p-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

                <Card className='card-login shadow p-0 mb-5 bg-white '>
                    <Card.Body className='p-0' >
                        <div className='d-flex justify-content-start' >
                            <Row>
                                <Col md={6} className='d-flex justify-content-center align-items-center'>
                                    <div className="img-login">
                                        <img className='' src={freshImg} alt="" />
                                    </div>
                                </Col>
                                <Col md={6} className='d-flex align-items-center flex-column' style={{ gap: '10px' }}>
                                    <div className="logo">
                                        <img src={logo} alt="logo" />
                                    </div>

                                    <div className="form-login px-4" >
                                        <h3 className='first-title'>Welcome to E-ShopStore </h3>
                                        <h6 className='second-title'><em>Please login to your account</em></h6>

                                        <div className="py-3"></div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope} /></span>
                                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock} /></span>
                                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                                        </div>



                                        <Button onClick={loginAction} className='w-100' variant="primary">Login</Button>

                                        <div className='pt-3 d-flex justify-content-center align-items-center' style={{ gap: '10px' }}>
                                            <div className='w-100' style={{ height: '1px', backgroundColor: '#b8b8b8' }}> </div>
                                            <div className='w-auto' style={{ color: '#1a1a1a' }} > OR </div>
                                            <div className='w-100' style={{ height: '1px', backgroundColor: '#b8b8b8' }}> </div>
                                        </div>
                                        <p className='pt-2 mb-0 text-start '>You don't have an account yet ?  <a style={{ color: '#00b4d8' }} className="link-offset-2  link-underline link-underline-opacity-0" href="#">Sign Up </a></p>
                                        <p className='pt-1 text-start '> <a style={{ color: '#00b4d8' }} className="link-offset-2  link-underline link-underline-opacity-0" href="#">Forget password ? </a></p>

                                    </div>


                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>
    );
}

export default Login;