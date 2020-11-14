import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';

function CourseDetail(props) {
  // get context from props, get state from context
  const { context } = props;
  const { authUser, authPassword, actions } = context;
  // create history object
  const history = useHistory();
  // get id param
  let { id } = useParams();
  // create stateful variables
  const [ course, setCourse ] = useState([]);
  const [ owner, setOwner ] = useState([]);

  // deleteCourse function makes a call to the api to delete the course with the matching id param from the database
  const deleteCourse = (event) => {
    event.preventDefault();

    actions.api(`/courses/${id}`, 'DELETE', null, true, { username: authUser.emailAddress, password: authPassword })
    .then(() => {
      history.push('/');
    })
    // if api responds with a 500 status code, redirect to '/error' route
    .catch(err => {
      if (err.response.status === 500){
        history.push('/error');
      }
    })
  }

  // When component mounts, retrieve course data with the matching id param and save it in state
  useEffect(() => {
    actions.api(`/courses/${id}`)
    // if api returns null, redirect to '/notfound` route
    .then(data => {
      if (data.data.course === null) {
        history.push('/notfound');
      } else {
        setCourse(data.data.course);
        setOwner(data.data.course.owner);
      }
    })
    // if api responds with a 500 status code, redirect to '/error' route
    .catch(err => {
      if (err.response.status === 500){
        history.push('/error');
      }
    });
  }, [id])

    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            {authUser && authUser.id === owner.id ?
              <React.Fragment>
                <div className="grid-100"><span><Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <button className="button" onClick={deleteCourse}>Delete Course</button></span>
                <Link className="button button-secondary" to="/">Return to List</Link></div>
              </React.Fragment>
            :
            <React.Fragment>
                <div className="grid-100"><span></span>
                <Link className="button button-secondary" to="/">Return to List</Link></div>
            </React.Fragment>
            }
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
              <ReactMarkdown>{course.description}</ReactMarkdown>
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
                  <ReactMarkdown>
                    {course.materialsNeeded}
                  </ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CourseDetail;