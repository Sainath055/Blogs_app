import React, { useState } from 'react';
import { BrowserRouter, Redirect,
  Switch, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Form from './components/Form/Form';
import Profile  from './components/Profile/Profile';
import UserSaved from './components/UserSavedPosts/UserSaved';
import UserMyPosts from './components/UserMyPosts/UserMyPosts';
import Footer from './Footer/Footer';
 

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  const [currentId, setCurrentId] = useState(null);

  console.log(user)

  return (
    <BrowserRouter>
      <> 
      <Navbar />
      <Switch>
        <>
        <div className='w-full h-max min-h-screen'>
          <Route path="/" exact component={() => <Redirect to="/posts"/>} />

          <Route
          path={["/posts", "/posts/search"]}
          exact
          render={() => <Home setCurrentId={setCurrentId} />}
          />

          <Route
            path={"/posts/:id"}
            exact
            render={({ match }) => {
              const { id } = match.params;
              return id.length > 10 ? <PostDetails id={id} /> : null;
            }}
          />

          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />

          <Route path="/write" exact render={() => 
          <Form currentId={currentId} 
          setCurrentId={setCurrentId} /> } />

          <Route path="/profile" exact render={() =>  
            (user ? <Profile /> : <Redirect to="/posts"/> )}/>
          <Route path="/myPosts/:id" exact render={() => 
            (user ? <UserMyPosts /> : <Redirect to="/posts"/> )}/>
          <Route path="/saved/:id" exact render={() => 
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