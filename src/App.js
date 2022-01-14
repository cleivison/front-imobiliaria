import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';

function App (props) {
 const {hideFooter, hideMain} = props;
  return (
    <div className="App">
      <Header/>      
      {/* {!hideMain &&  <Main/>} */}
      {hideMain && <div style={{padding: '0.5rem'}} />} 
      {props.children}
      {!hideFooter && <Footer/>}
    </div>
  );
  
}

export default App;
