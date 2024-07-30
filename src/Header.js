import React from 'react'
import './Header.css'
import headerImage from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/amazon_PNG11.png';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

// import SearchIcon from '@material-ui/icons/Search';

function Header() {
   const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

  return (
    <div className="header">
        <Link to="/">
        <img className ="header__logo" 
             src={headerImage} alt='amazon-logo' />
        </Link>
        <div className="header__search"> 
            {/* Search bar */}
            <input className="header__searchInput" type='text' />
            {/* <SearchIcon className="header__searchIcon" /> */}
            {/* Logo */}
        </div>
        
        <div className="header__nav">
            <Link to={!user && "/login"}>  {/* If there is no user, then redirect to the login page */}
            <div onClick={handleAuthentication} className="header__option">
                <span className='header__optionLineOne'>{user ? `Hello ${user.email}` : 'Hello Guest'}</span>
                <span className='header__optionLineTwo'>{user ? ' Sign Out': 'Sign In'}</span>
            </div>
            </Link>
            <div className="header__option">
                <span className='header__optionLineOne'>Returns </span>
                <span className='header__optionLineTwo'>& Orders</span>
            </div>
            <div className="header__option">
                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
            </div>

            <Link to="/checkout"> 
                <div className="header__option">
                <span className='header__optionLineOne'>Cart</span>
                <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span> {/*Optional chaining: basket?.length is used to prevent the error "Cannot read property 'length' of undefined" from being thrown. */}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header