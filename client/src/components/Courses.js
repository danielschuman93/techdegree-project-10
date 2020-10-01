import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import CourseModule from './CourseModule';
const axios = require('axios');

function Courses() {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
        .then(data => setData(data.data.courses))
        .catch(err => console.log('Aye!:', err))
    }, [])

    const courses = data.map(course => <CourseModule data={course} url={`http://localhost3000:/courses/${course.id}`} key={course.id}/>)

    return(
        <div>
            <Header/>
            <hr/>
            <div className="bounds">
            {courses}
            <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </a></div>
            </div>
        </div>
    );
}

export default Courses;