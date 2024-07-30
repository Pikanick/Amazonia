import React, {useState} from 'react'
import './Login.css'
import logo from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/Amazon-Logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';

function Login() {
    const navigate = useNavigate(); // useHistory is a hook that gives you access to the history instance that you may use to navigate.
    const [email, setEmail] = useState('');  //useState should be used to manage state within a component.
    const [password, setPassword] = useState('');  //useStateValue should be used to manage state shared across multiple components.
   
    const signIn = e => {
        e.preventDefault(); // prevents the page from refreshing

        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            navigate('/')
        })
        .catch(error => alert(error.message))  // alert() method displays an alert box with a specified message and an OK button. made for the user to see onscreen

        
        db.collection('users').add({
            email: email,
            password: password,
        })
        .then(() => {
            console.log("User has been added to the database");
        })
        .catch((error) => {
            console.error("Error adding user: ", error); // console.error() method writes an error message to the console. made for the developer to see in the console
        });
    }

    const register = e => { 
        e.preventDefault();  
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            // it successfully created a new user with email and password
            console.log(auth);
            if (auth) {
                navigate('/')
            }
        })
        .catch(error => alert(error.message))
    }

  return (
    <div className="login" >
        <Link to="/">
        <img className ="login__logo" 
             src={logo} alt='amazon-logo' />
        </Link>
 
        <div className="login__container">
            <h1>Sign In</h1>
            <form>
                <h5>E-mail</h5>
                <input type="text" value ={email} onChange={e=> setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value ={password} onChange={e=> setPassword(e.target.value)} />
                <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button> 
                {/*onClick event handler is used to handle the click event. When the button is clicked, 
                the signIn function is called. type="submit" is used to submit the form data to the server 
                upon hitting enter key.*/} 
            </form>
            <p className="disclaimer">
                By signing-in, you agree to the AMAZON CLONE Conditions of Use and Privacy Notice.
            </p>
            <p className="login_createNew">New to Amazon?</p>
            <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
        </div>
    </div>
  );
}

export default Login;