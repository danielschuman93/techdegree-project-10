import React, { useState, useEffect } from 'react';
import CourseModule from './CourseModule';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function Courses(props) {
    const { context } = props;
    const { actions } = context;
    const history = useHistory();

    const [ data, setData ] = useState([]);

    useEffect(() => {
        actions.api('/courses')
        .then(data => {
            // console.log(data.data);
            setData(data.data.courses);
        })
        .catch(err =>{
            if (err.status === 500){
                history.push('/error');
            }
        });
    }, [])

    const courses = data.map(course => <CourseModule data={course} path={`/courses/${course.id}`} key={course.id}/>)

    return(
        <div className="bounds">
            {courses}
            <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>New Course</h3>
            </Link></div>
        </div>
    );
}

export default Courses;