import React from 'react'
import Set from './Set'
require('./css/Exercise.css')
class Exercise extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sets: props.sets,
            render: false,
            counter: 0
        }
    }
    
    addSet = ()=>{
        let reps = document.getElementById(`${this.props.date}${this.props.name}reps`).value
        let weight = document.getElementById(`${this.props.date}${this.props.name}weight`).value
        let dateObjectForMathRand = new Date().getTime()
        let setKeyValue = `${dateObjectForMathRand}`
        let WorkOutsObject = JSON.parse(localStorage.WorkOuts)
        let indexOfWorkOut = WorkOutsObject.WorkOuts.findIndex(element => element.date === this.props.date)
        let indexOfExercise = WorkOutsObject.WorkOuts[indexOfWorkOut].exercises.findIndex(element => element.name === this.props.name)
        WorkOutsObject.WorkOuts[indexOfWorkOut].exercises[indexOfExercise].sets.push({"reps": parseInt(reps), "weight": parseInt(weight), "name": this.props.name, "key": setKeyValue})
        this.setState(
            {sets: WorkOutsObject.WorkOuts[indexOfWorkOut].exercises[indexOfExercise].sets,
            render: this.state.render})
        localStorage.WorkOuts = JSON.stringify(WorkOutsObject)
    }

    deleteExercise = () => {
        let workOutsObject = JSON.parse(localStorage.WorkOuts)
        let indexOfWorkOut = workOutsObject.WorkOuts.findIndex((element)=> {
            return element.date === this.props.date
        })
        let indexOfExercise = workOutsObject.WorkOuts[indexOfWorkOut].exercises.findIndex((element)=> {
            return element.name === this.props.name
        })
        workOutsObject.WorkOuts[indexOfWorkOut].exercises.splice(indexOfExercise, 1)
        localStorage.WorkOuts = JSON.stringify(workOutsObject)
        document.location.reload()
    }

    renderExercise = ()=>{
        //console.log(this.state.sets)
        let setComponents = this.state.sets.map((element, index)=>{
            return <Set onChangeMethod={this.onChangeHander} date={this.props.date} key={`${this.props.indexOfExercise}${index}Set`} name={element.name} keyValue={element.key} reps={element.reps} weight={element.weight}/>
        })
        return(
            <div>
            <input id={`${this.props.date}${this.props.name}reps`} placeholder="reps"/>
            <input id={`${this.props.date}${this.props.name}weight`}placeholder="weight"/>
            <button onClick={this.addSet}>Add Set</button>
            {setComponents}
        </div>
        )
    }

    render(){
        
        return (
            <div className="ExerciseDiv">
            <h1 className="Exercise" onClick={()=>{
                this.setState(
                    {sets: this.state.sets,
                        render: !this.state.render}
                )
            }}>{this.props.name}</h1><button className="DeleteExerciseButton" onClick={this.deleteExercise}>Delete</button><br/><br/>
            {this.state.render ? this.renderExercise() : null}
            </div>
        )
    }

}

export default Exercise
