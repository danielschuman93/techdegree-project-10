import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

function CourseDetail(props) {
  const { context } = props;
  const { authUser, actions } = context;

  let { id } = useParams();

  const [ course, setCourse ] = useState([]);
  const [ owner, setOwner ] = useState([]);

  useEffect(() => {
    actions.api(`/courses/${id}`)
    .then(data => {
        setCourse(data.data.course);
        setOwner(data.data.course.owner);
    });
  }, [id])

    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link><a className="button" href="#">Delete Course</a></span><Link className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {owner.firstName} {owner.lastName}</p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {course.materialsNeeded}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CourseDetail;