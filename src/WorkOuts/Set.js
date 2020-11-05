import React from 'react'

class Set extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reps: props.reps,
            weight: props.weight
        }
    }

    deleteSet = () => {
        //let thisSet = document.getElementById(`${this.props.keyValue}`)
        let WorkOutsObject = JSON.parse(localStorage.WorkOuts)
        let WorkOutsArray = WorkOutsObject.WorkOuts
        let indexOfWorkOut = WorkOutsArray.findIndex((element)=>{return element.date === this.props.date})
        let indexOfExercise = WorkOutsArray[indexOfWorkOut].exercises.findIndex((element)=>{return element.name === this.props.name})
        let indexOfSet = WorkOutsObject.WorkOuts[indexOfWorkOut].exercises[indexOfExercise].sets.findIndex((element)=> {return element.key === this.props.keyValue})
        WorkOutsObject.WorkOuts[indexOfWorkOut].exercises[indexOfExercise].sets.splice(indexOfSet, 1)
        localStorage.WorkOuts = JSON.stringify(WorkOutsObject)
        document.location.reload()
    }

    render(){
        return (
        <div>
            
          <h3 id={this.props.keyValue}>
                reps {this.state.reps} ={">"} weight {this.state.weight}
            </h3>
            <button onClick={this.deleteSet}>Delete Set</button>
        </div>
    )}
}

export default Set
