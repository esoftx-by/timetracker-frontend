import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import style from './Project.module.css'


const Project = (props) => {
    const params = useParams();
    let id = params.id
    useEffect(() => {
        props.setProjectIdThunk(id)
    }, [])
    return (
        <div className={style.project}>
            {props.project && <div>
                <h2>{props.project.name}</h2>
                <div>{props.project.description}</div>
                <div>{props.project.customer}</div>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    project: state.projectsPage.project
})

export default connect(mapStateToProps, {setProjectIdThunk})(Project)
