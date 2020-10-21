import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { Context } from '../Context';


function UpdateCourse() {
    const { actions, authUser } = useContext(Context);
    const history = useHistory();
    let { id } = useParams();
  
    const [ course, setCourse ] = useState([]);
    const [ owner, setOwner ] = useState([]);
  
    useEffect(() => {
        if (!authUser) {
            history.push('/signin')
        } else {
            actions.api(`/courses/${id}`)
            .then(data => {
                setCourse(data.data.course);
                setOwner(data.data.course.owner);
            });
        }
    }, [id])

    return(
        <div>
            <Header/>
            <hr/>
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title} /></div>
                                <p>By {owner.firstName} {owner.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={course.description} /></div>
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} /></div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={course.materialsNeeded} /></div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link className="button button-secondary" to={`/courses/${id}`}>Cancel</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateCourse;