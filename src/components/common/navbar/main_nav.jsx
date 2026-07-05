import React, { use, useRef, useState } from 'react';
import { Form, Col, Row, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import MyLogo from '@/assets/imgs/veryfrais.png'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import axiosIns from '@/plugins/axiosIns';

const MainNav = () => {

    const [searchValues, setSearchValues] = useState();
    const [openList, setOpenList] = useState(false);
    const searchRef = useRef();
    const cartItemsCount = useSelector((state) => state.cart.cartitems.length);
    const isNavbarVisible = useSelector((state) => state.global.navbar.show);
    const dispatch = useDispatch();
    const controllerRef = useRef(null); // store the controller between renders
    const [loading, setLoading] = useState(false);

    const showNavbar = (show) => {
        dispatch({ type: 'global/toggleNav' });
    }

    const searchProduct = async () => {
        let searchValue = searchRef.current.value;

        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();

        try {
            console.log(searchValue);

            const { data } = await axiosIns.get('products/search', {
                params: {
                    'search': searchValue
                },
                signal: controllerRef.current.signal
            });
            if (data.products && data.products.length > 0) {
                setSearchValues(data.products);
            }
            console.log(data.products);
        } catch (err) {
            if (err.name !== "AbortError") console.error(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='logo-home w-100'>
                <Row className='w-100 d-flex align-items-center justify-content-between mx-2'>
                    <Col xs={6} sm={6} md={3} className='MyLogo d-flex align-items-center justify-content-start gap-2'>

                        <button onClick={showNavbar}>
                            <img className="" src={MyLogo} alt="Logo" />
                        </button>

                        <h5 className='m-0'>
                            <Link to="/">ShopStore</Link>
                        </h5>
                    </Col>
                    <Col xs={6} sm={6} md={6} className='search-product  position-relative' >
                        <div className='d-flex align-items-center justify-content-start '>
                            <Form.Control
                                onFocus={() => setOpenList(true)}
                                onBlur={() => setOpenList(false)}
                                onChange={searchProduct}
                                ref={searchRef}
                                type="search"
                                placeholder="Search for products, categories or brands..."
                                className=""
                                aria-label="Search"
                                id="search-product"
                            >
                            </Form.Control>
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>

                        </div>
                        {openList && openList == true ? <div className='searchList'>
                            <ul class="list-group list-group-flush">
                                {searchValues && searchValues.length > 0 ? (
                                    searchValues.map((product) => (
                                        <li class="list-group-item" key={product.id}>
                                            <div>
                                                <img className='small-img' src={product.image_url} alt={product.name} />
                                                {product.name}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li class="list-group-item">No products found</li>
                                )}
                            </ul>
                        </div> : ''}

                    </Col>

                    <Col md={3} className='myaccount p-3  align-items-center justify-content-end gap-4'>
                        <button className=' d-flex align-items-center gap-3 p-0 bg-transparent border-0 text-start  btn btn-light' type="button" >
                            <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faUser} />
                            <div className='d-flex flex-column '>
                                <small style={{ fontSize: '13px' }} className='text-secondary'>
                                    sign in
                                </small>
                                <small style={{ fontSize: '13px', fontWeight: 'bold' }} >
                                    Account
                                </small>

                            </div>
                        </button>
                        {/* <button className='setCountUp p-0  bg-transparent border-0 text-start  btn btn-light' type="button" >
                            <FontAwesomeIcon style={{ fontSize: '23px' }} icon={faHeart} />
                        </button> */}
                        <Link to="/cart">
                            <button className='position-relative p-0  bg-transparent border-0 text-start  btn btn-light' type="button" >
                                <div className='setCountUp'>
                                    <div>{cartItemsCount}</div>
                                </div>
                                <FontAwesomeIcon style={{ fontSize: '23px' }} icon={faCartShopping} />
                            </button>
                        </Link>
                    </Col>
                </Row>

            </div>

        </>
    );
};

export default MainNav;