import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div className='header-wrapper'>
                {/* Add Image Here */}
                <div>Full Stack Boys</div>
                <Link to='/'>Home</Link>
            </div>
        </header>
    )
}

export default Header;