import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>Lambda Pizza Eats</h1>
            <img  
                src="./components/Pizza.jpg" 
                alt="Pizza picture"
            />
                <Link to={"/Form"}>
                    <div>Order Now</div>
                </Link>
        </div>
    )
}






export default Home;