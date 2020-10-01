import React from 'react';

// Component to create course previews
const CourseModule = (props) => {
    return(
        <div className="grid-33"><a className="course--module course--link" href={props.url}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.data.title}</h3>
          </a></div>
    )
}

export default CourseModule;