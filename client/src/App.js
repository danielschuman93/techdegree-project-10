import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';


function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Courses/>} />
        <Route path="/courses/create" render={() => <CreateCourse/>} />
        <Route path="/courses/:id/update" render={() => <UpdateCourse/>} />
        <Route exact path="/courses/:id" render={() => <CourseDetail/>} />
        <Route path="/signin" render={() => <UserSignIn/>} />
        <Route path="/signup" render={() => <UserSignUp/>} />
        <Route path="/signout" render={() => <UserSignOut/>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
