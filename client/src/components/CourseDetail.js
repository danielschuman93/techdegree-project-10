import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from "react-router";
import { Context } from '../Context';
import { Link } from 'react-router-dom';

function CourseDetail() {
  const { actions, authUser } = useContext(Context);

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
        <Header/>
        <hr/>
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100"><span><Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link><a className="button" href="#">Delete Course</a></span><a className="button button-secondary" href="/">Return to List</a></div>
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
      </div>
    )
}

export default CourseDetail;