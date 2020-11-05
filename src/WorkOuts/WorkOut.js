import React from 'react'
import Exercise from './Exercise'
import OneExercise from './exercises/OneExercise'
require('./css/WorkOut.css')
require('../style.css')

class WorkOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Exercises: this.props.exercises,
            render: this.props.index === 0 ? true : false,
            Date: this.props.date,
            showDateEditor: false
        }
    }

    listAllExercises = () => {
        let exerciseList = JSON.parse(localStorage.exerciseList)
        let exerciseListComponents = exerciseList.exercisesArray.map(exercise => {
            return <OneExercise date={this.state.Date} key={exercise.key} name={exercise.name} />
        })
        return (exerciseListComponents)
    }
    addExercise = () => {
        let exerciseName = document.getElementById(`addExercise${this.props.date}`).value
        let exercisesArray = this.state.Exercises
        exercisesArray.push({ name: exerciseName, sets: [] })
        this.setState(prevState => {
            return { Exercises: exercisesArray, render: this.state.render, Date: this.state.Date }
        })

        let workoutsObject = JSON.parse(localStorage.WorkOuts)
        console.log(JSON.stringify(workoutsObject))
        let indexOfWorkout = workoutsObject.WorkOuts.findIndex((element) => element.date === this.props.date)
        workoutsObject.WorkOuts[indexOfWorkout].exercises = exercisesArray
        
        console.log(this.props.workOutsObjec)
        localStorage.WorkOuts = JSON.stringify(workoutsObject)
        this.props.UpdateWorkOutsObject(workoutsObject)
    }


    renderWorkOut = () => {

        let ExerciseComponents = this.state.Exercises.map((element, index) => {
            return <Exercise indexOfExercise={index} date={this.props.date} sets={element.sets} key={index} name={element.name} />
        })

        return (
            <div className="InnerWorkOutDiv">
                <button className="DeleteWorkOutButton" onClick={this.deleteWorkOut}>Delete</button>
                <select className="SelectExercise" id={`addExercise${this.props.date}`}>
                    {this.listAllExercises()}
                </select>
                <button className="AddExerciseButton" onClick={this.addExercise}>Add Exercise</button><br /> <br />
                {ExerciseComponents}
            </div>)
    }


    deleteWorkOut = () => {
        let workOutsObject = JSON.parse(localStorage.WorkOuts)
        let indexOfWorkOut = workOutsObject.WorkOuts.findIndex((element) => {
            return element.date === this.props.date
        })
        workOutsObject.WorkOuts.splice(indexOfWorkOut, 1)
        localStorage.WorkOuts = JSON.stringify(workOutsObject)
        //this.props.localStorageChanged()
        this.props.UpdateWorkOutsObject(workOutsObject)
        console.log(workOutsObject)
        //document.location.reload()
    }

    showDateInputField = () => {
        this.setState((prevState)=>{
            return {Exercises: prevState.Exercises,
            render: prevState.render,
            Date: prevState.Date,
            showDateEditor: !prevState.showDateEditor}
        })
    }

    editWorkOutDate = () => {
        let WorkOutsObject = JSON.parse(localStorage.WorkOuts)
        let WorkOutsArray = WorkOutsObject.WorkOuts
        let indexOfThisWorkOutDate = WorkOutsArray.findIndex((element) => { return element.date === this.state.Date })
        let newDate = document.getElementById(`newDateForWorkOut${this.state.Date}`).value
        console.log(typeof(newDate))
        if(newDate.length > 0){
        WorkOutsObject.WorkOuts[indexOfThisWorkOutDate] = {date: newDate, exercises: this.state.Exercises}
        localStorage.WorkOuts = JSON.stringify(WorkOutsObject)
          
        this.setState((prevState)=>{
            return {Exercises: prevState.Exercises,
            render: prevState.render,
            Date: newDate,
            showDateEditor: !prevState.showDateEditor}
        })
    }
        else {
            this.setState((prevState)=>{
                return {Exercises: prevState.Exercises,
                render: prevState.render,
                Date: prevState.Date,
                showDateEditor: !prevState.showDateEditor}
            }) 
        }
    }

    render() {
        return (
            <div className="OutterWorkOutDiv">
                {this.state.showDateEditor ? <input type="date" id={`newDateForWorkOut${this.state.Date}`}/> : null}
                {this.state.showDateEditor ? <h1 className="EditDateButton" onClick={this.editWorkOutDate}>Confirm Date</h1> : <h1 onClick={this.showDateInputField} className="EditDateButton">Edit Date</h1>}
                
                <h1 className="WorkOut" onClick={() => {
                    this.setState(prevState => {
                        return { Exercises: this.state.Exercises, render: !this.state.render, Date: this.state.Date }
                    })
                }}>{this.state.Date}</h1> <br></br>
                {this.state.render ? this.renderWorkOut() : null}
                <br></br>
            </div>

        )
    }
}

export default WorkOut