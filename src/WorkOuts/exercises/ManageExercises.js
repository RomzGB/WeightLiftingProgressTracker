import React from 'react'
import OneExercise from './OneExercise'
require('../css/ManageExercises.css')

class ManageExercises extends React.Component {
    constructor(){
        super()
        this.state = {exerciseList: localStorage.exerciseList}
    }



    addExercise = () => {
        
        let exerciseList = JSON.parse(this.state.exerciseList)
        let newExerciseName = document.getElementById("exerciseName").value
        let exerciseObject = {name: newExerciseName, key: exerciseList.exercisesArray.length}

        exerciseList.exercisesArray.push(exerciseObject)

        let exercisesString = JSON.stringify(exerciseList)
        let unescapedString = unescape(exercisesString)
        
        localStorage.exerciseList = unescapedString
        this.setState(()=> {
            return {exerciseList: unescapedString}
        })
        document.location.reload()
    }

    deleteExercise = ()=>{
        let exerciseList = JSON.parse(this.state.exerciseList)
        let newExerciseName = document.getElementById("selectedExercise").value
        let indexOfExercise = exerciseList.exercisesArray.findIndex((element)=>{return element.name === newExerciseName})
        exerciseList.exercisesArray.splice(indexOfExercise, 1)
        localStorage.exerciseList = JSON.stringify(exerciseList)
        console.log(this.state.exerciseList, JSON.stringify(exerciseList))
        this.setState(()=>{
            return {exerciseList: JSON.stringify(exerciseList)}
        })
        
    }


    exercisesListJSX = () => {
        let parsedExerciseJSONObject = JSON.parse(this.state.exerciseList)
        let exerciseList = parsedExerciseJSONObject.exercisesArray.map(exercise=>{
        return <OneExercise key={exercise.key} name={exercise.name}/>
    })
        return (exerciseList)
    }



    render(){
    return (
        <div className="manageExercisesDiv">
            <button onClick={this.deleteExercise}>Delete Exercise</button>
            <select id={`selectedExercise`}>
            {this.exercisesListJSX()}
            </select>
            
            <input id="exerciseName" type="text" placeholder="Add New Exercise to List"/>
            <button onClick={this.addExercise}>Add Exercise</button>
        </div>
    )
    }
}
export default ManageExercises

