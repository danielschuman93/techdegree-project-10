import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function CreateCourse(props) {
    const { context } = props;
    const { authUser, authPassword, actions } = context;
    const history = useHistory();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState('');
    const [ materialsNeeded, setMaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const changeTitle = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
  
    const changeDescription = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const changeEstimatedTime = (event) => {
        const value = event.target.value;
        setEstimatedTime(value);
    }

    const changeMaterialsNeeded = (event) => {
        const value = event.target.value;
        setMaterialsNeeded(value);
    }

    const submit = (event) => {
        event.preventDefault();

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id,
        };

        actions.api(`/courses`, 'POST', newCourse, true, { username: authUser.emailAddress, password: authPassword })
        .then(() => {
            history.push(`/`);
        })
        .catch(err => {
            if (err.response.data.errors) {
                const errors = err.response.data.errors.map((err, index) => <li key={index}>{err}</li>);
                setErrors(errors);
                console.log(errors);
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
                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={changeTitle}/></div>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={changeDescription}></textarea></div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={changeEstimatedTime}/></div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={changeMaterialsNeeded}></textarea></div>
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