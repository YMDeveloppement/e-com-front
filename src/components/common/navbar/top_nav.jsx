import React from 'react';
import { Carousel, Form, Col, Row, InputGroup } from 'react-bootstrap';
import { useRef } from 'react'

const TopNav = () => {

    const searchRef = useRef();

    const langs = [
        { id: 1, name: 'English' },
        { id: 2, name: 'Frensh' },
        { id: 3, name: 'Arabic' },
    ];
    const currencies = [
        { id: 1, name: 'MAD' },
        { id: 2, name: 'Euro' },
        { id: 3, name: 'USD' },
    ];
    // Today's Deals
    // Gift Cards
    // Sell
    // Registry
    // Prime Video
    // Customer Service
    return (
        <>
            <div className='top_nav nav mx-auto '>
                <div className='row border-bottom w-100 py-1 px-2  '>

                    <div className='col-6 navLinks '>
                        <nav className=" navbar navbar-expand-lg navbar-light default-nav">
                            <div className="container-fluid ">
                                <button className="d-none navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Shop
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Fruits & Vegetables</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" >Beverages</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " href="#" >Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-end gap-3'>
                        <li>
                            <Form.Select aria-label="Default select example">
                                {langs.map((lang, index) => (
                                    <option key={index} value={lang.id}>{lang.name}</option>

                                ))}
                            </Form.Select>
                        </li>
                        <li>
                            <Form.Select aria-label="Default select example">
                                {currencies.map((currency, index) => (
                                    <option key={index} value={currency.id}>{currency.name}</option>
                                ))}
                            </Form.Select>
                        </li>
                        <li>
                            <a style={{ color: "#6B7280 !important" }} className=" link-offset-2 link-underline link-underline-opacity-0" href="#">Order Tracking</a>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopNav;