import React from 'react';
import { Link } from 'react-router-dom';

// Component to create course previews
const CourseModule = (props) => {
    return(
        <div className="grid-33"><Link className="course--module course--link" to={props.path}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.data.title}</h3>
          </Link></div>
    )
}

export default CourseModule;