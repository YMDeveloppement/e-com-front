import React from 'react';

const Navbar = () => {
    return (
        <div style = {{overflow: 'hidden'}} >
            <div style={{minWidth:'1300px'}}  className='solde d-flex align-items-center justify-content-around '>
                <p className='text-center p-0 m-0'>FREE delivery & 40% Discount for next 3 orders! Place your 1st order in.</p>
                <p className="p-0 m-0">
                    Until the end of the sale: <b>47</b> days <b>06</b> hours <b>55</b> minutes <b>51</b> sec.
                </p>
                <p className='p-0 m-0'>We deliver to you every day from <span className="time">7:00 to 23:00</span></p>
            </div>
        </div>
    );
};


export default Navbar;