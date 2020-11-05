import React from 'react'
require('../../style.css')
require('../css/ManageExercises.css')
function OneExercise(props) {
    return (
        
            <option className="ExerciseOption"value={props.name}>{props.name}</option>
        
    )
}

export default OneExercise
