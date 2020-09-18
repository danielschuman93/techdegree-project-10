import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios');

const courses = axios.get('localhost:5000/api/courses');
console.log(courses);

function App() {
  // const [courses, setCourses] = useState();
  // useEffect(() => {
  //   setCourses(axios.get('localhost:5000/api/courses'));
  //   console.log(courses);
  // });
  return(
    <div>HELLO</div>
  );
}

export default App;
