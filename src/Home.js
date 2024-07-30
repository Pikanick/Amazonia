import React from 'react'
import './Home.css'
import homeImage from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/home_img.jpg';
import Product from './Product';
import lean from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/lean_startup.jpg';
import Kenwood from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/Kenwood.jpg';
import samsunga from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/samsunga.jpg';
import echo from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/echo.jpg';
import ipad from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/ipad.jpg';
import samsungb from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/samsungb.jpg';


function Home() {
  return (
    <div className="home">
        <div className="home__container"> 
            <img className="home__image" 
                 src={homeImage} alt='home-image' />
                 {/* src="/img/home_img.jpg" */}
            <div className="home__row">
                {/* custom react component which is js with some html sprinkled in */}
                <Product 
                id="12321341"
                title = "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses" 
                image={lean} 
                price={29.99} 
                rating={5} />  
                
                <Product 
                id="49538094"
                title="Kenwood Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" 
                image={Kenwood} 
                price={239.0} 
                rating={4} />
            </div>
            <div className="home__row">
                <Product 
                id = "4903850"
                title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor" 
                image={samsunga} 
                price={199.99} 
                rating={3} />
                
                <Product 
                id = "23445930"
                title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric" 
                image={echo} 
                price={98.99} 
                rating={5} />
                
                <Product 
                id = "3254354345"
                title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)" 
                image={ipad} 
                price={598.99} 
                rating={4} />
            </div>
            <div className="home__row">
                <Product 
                id = "90829332"
                title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x1440" 
                image={samsungb}
                price={189.99} 
                rating={4}/>
            </div>
        </div> 
    </div>
  )
}

export default Home