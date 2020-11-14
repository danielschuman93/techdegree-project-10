import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";


function UpdateCourse(props) {
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
    const [ errors, setErrors ] = useState([]);

    // change function modifies values in state based on input form values with the corresponding name
    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCourse({ ...course, ...{ [name]: value } });
    }

    // submit function uses course object saved in state to make a call to the api to update the course with the matching id param 
    const submit = (event) => {
        event.preventDefault();
        // use state to create new updatedCourse object
        const updatedCourse = {
            id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: authUser.id,
        };
        // PUT request to api 
        actions.api(`/courses/${id}`, 'PUT', updatedCourse, true, { username: authUser.emailAddress, password: authPassword })
        // redirect to course details page of updated course
        .then(() => {
            history.push(`/courses/${id}`);
        })
        // if api returns errors array, save errors in state as an array of list items
        // else if api responds with a 500 status code, redirect to '/error' route
        .catch(err => {
            if (err.response.data.errors) {
                const errors = err.response.data.errors.map((err, index) => <li key={index}>{'Please provide a value for ' + err.param + '.'}</li>);
                setErrors(errors);
                console.log(errors);
            } else if (err.response.status === 500) {
                history.push('/error');
            }
        });
    }

    // When component mounts, retrieve course data with the matching id param and save it in state
    useEffect(() => {
        actions.api(`/courses/${id}`)
        // if api returns null, redirect to '/notfound` route
        // else if owner id retrieved from course data does not match owner id saved in state redirect to '/forbidden' route
        .then(data => {
            if (data.data.course === null) {
                history.push('/notfound');
            } else if (data.data.course.owner.id !== authUser.id) {
                history.push('/forbidden');
            } else {
                setCourse(data.data.course);
                setOwner(data.data.course.owner);
            }
        })
        // if api responds with a 500 status code, redirect to '/error' route
        .catch(err =>{
            if (err.status === 500){
                history.push('/error');
            }
        });
    }, [id])

    return(
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <div>
                    {errors.length > 0 ?
                        <React.Fragment>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    {errors}
                                </ul>
                            </div>
                        </React.Fragment>
                    :
                        <span></span>
                    }
                </div>
                <form onSubmit={submit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={course.title} onChange={change}/></div>
                            <p>By {owner.firstName} {owner.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div><textarea id="description" name="description" className='' placeholder="Course description..." value={course.description} onChange={change}/></div>
                        </div>
                        </div>
                        <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={course.estimatedTime} onChange={change}/></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className='' placeholder="List materials..." value={course.materialsNeeded} onChange={change}/></div>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link className="button button-secondary" to={`/courses/${id}`}>Cancel</Link></div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse;