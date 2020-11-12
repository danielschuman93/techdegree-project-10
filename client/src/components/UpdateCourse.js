import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";


function UpdateCourse(props) {
    const { context } = props;
    const { authUser, authPassword, actions } = context;
    const history = useHistory();
    let { id } = useParams();
  
    const [ course, setCourse ] = useState([]);
    const [ owner, setOwner ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCourse({ ...course, ...{ [name]: value } });
    }

    const submit = (event) => {
        event.preventDefault();

        const updatedCourse = {
            id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: authUser.id,
        };

        actions.api(`/courses/${id}`, 'PUT', updatedCourse, true, { username: authUser.emailAddress, password: authPassword })
        .then(() => {
            history.push(`/courses/${id}`);
        })
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

    useEffect(() => {
        actions.api(`/courses/${id}`)
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