import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => console.log(status, lodding, error)}>button </button>
            <div className='logo-home w-100'> unauthorized Page ! {JSON.stringify(localStorage.getItem("userEcom"))} </div>
        </>
    )
}
