import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function CreateCourse(props) {
    // get context from props, get state from context
    const { context } = props;
    const { authUser, authPassword, actions } = context;
    // create history object
    const history = useHistory();
    // create stateful variables
    const [ course, setCourse ] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    });
    const [ errors, setErrors ] = useState([]);

    // change function modifies values in state based on input form values with the corresponding name
    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCourse({ ...course, ...{ [name]: value } });
    }

    // submit function uses course object saved in state to make a call to the api to create the new course in the database
    const submit = (event) => {
        event.preventDefault();
        // use values saved in state to create new course object
        const newCourse = {
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: authUser.id,
        };
        // POST request to api
        actions.api(`/courses`, 'POST', newCourse, true, { username: authUser.emailAddress, password: authPassword })
        // then redirect to homepage
        .then(() => {
            history.push(`/`);
        })
        // if api returns errors array, save errors in state as an array of list items
        // else if api responds with a 500 status code, redirect to '/error' route
        .catch(err => {
            if (err.response.data.errors) {
                const errors = err.response.data.errors.map((err, index) => <li key={index}>{err}</li>);
                setErrors(errors);
                console.log(errors);
            } else if (err.response.status === 500) {
                history.push('/error');
            }
        });
    }

    return(
        <div className="bounds course--detail">
            <h1>Create Course</h1>
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
                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={change}/></div>
                            <p>By {authUser.firstName} {authUser.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={change}></textarea></div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={change}/></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={change}></textarea></div>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse;