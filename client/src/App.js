import React, { useState } from 'react';
import { BrowserRouter, Redirect,
  Switch, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Form from './components/Form/Form';
import  Profile  from './components/Profile/Profile';
import UserSaved from './components/UserSavedPosts/UserSaved';
import UserMyPosts from './components/UserMyPosts/UserMyPosts';
import Footer from './Footer/Footer';
 

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  const [currentId, setCurrentId] = useState(null);

  return (
    <BrowserRouter>
      <> 
      <Navbar />
      <Switch>
        <>
        <div className='w-full h-max min-h-screen'>
          <Route path="/" exact component={() => <Redirect to="/posts"/>} />
          <Route path="/posts" exact component={() => 
          <Home setCurrentId={setCurrentId} /> } />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => 
            (!user ? <Auth /> : <Redirect to="/posts"/> )}/>
          <Route path="/write" exact component={() => 
          <Form currentId={currentId} 
          setCurrentId={setCurrentId} /> } />
          <Route path="/profile" exact component={() =>  
            (user ? <Profile /> : <Redirect to="/posts"/> )}/>
          <Route path="/myPosts/:id" exact component={() => 
            (user ? <UserMyPosts /> : <Redirect to="/posts"/> )}/>
          <Route path="/saved/:id" exact component={() => 
            (user ? <UserSaved /> : <Redirect to="/posts"/> )}/>
          </div>
        </>
      </Switch>
        <Footer />
      </>
    </BrowserRouter>
  )
}

export default App