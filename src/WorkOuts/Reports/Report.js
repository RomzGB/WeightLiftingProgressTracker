import React from 'react'

require('../css/Reports.css')
class Report extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            WorkOutsObject: this.props.WorkOutsObject
        }
    }
    getUniqueExercises = ()=>{
        let uniqueExercisesArray = []
        let workOutsArray = this.state.WorkOutsObject.WorkOuts
        for(let WorkOutIndex = 0; WorkOutIndex < workOutsArray.length; WorkOutIndex++){
            let exercisesOfOneWorkOutArray = workOutsArray[WorkOutIndex].exercises
            for(let exerciseIndex = 0; exerciseIndex < exercisesOfOneWorkOutArray.length; exerciseIndex++){
                if(!uniqueExercisesArray.some((element)=> element.name === exercisesOfOneWorkOutArray[exerciseIndex].name))
                uniqueExercisesArray.push({name: exercisesOfOneWorkOutArray[exerciseIndex].name, rawWorkOuts: [], processedWorkOuts: []})
            }

        }
        return uniqueExercisesArray
    }

    generateWorkOutDataForEachExercise = ()=>{
        let unqiueExercisesArray = this.getUniqueExercises()
        let workOutsArray = this.state.WorkOutsObject.WorkOuts
        unqiueExercisesArray.forEach((element, index, array)=>{
            for(let indexOfWorkOut = 0; indexOfWorkOut < workOutsArray.length; indexOfWorkOut++){
                for(let indexOfExercise = 0; indexOfExercise < workOutsArray[indexOfWorkOut].exercises.length; indexOfExercise++){
                    if(workOutsArray[indexOfWorkOut].exercises[indexOfExercise].name === element.name){
                        let totalSets = 0, totalReps = 0, avgWeight = 0, volume = 0 
                        workOutsArray[indexOfWorkOut].exercises[indexOfExercise].sets.forEach((set, indexOfSet, arrayOfSets)=>{
                            totalSets++
                            totalReps += set.reps
                            volume += set.reps * set.weight
                        })
                        avgWeight = volume / totalReps
                        let workOutData = {totalSets, totalReps, avgWeight, volume}
                        unqiueExercisesArray[index].rawWorkOuts.push(workOutData)
                    }
                }
            }   
        })
        return unqiueExercisesArray
    }

    compareExerciseDataBetweenWorkOuts = ()=>{
        let exerciseProcessedData = this.generateWorkOutDataForEachExercise()
        //console.log(exerciseProcessedData)
        exerciseProcessedData.forEach((element, index, array)=>{
            for(let workoutIndex = 0; workoutIndex < element.rawWorkOuts.length - 1; workoutIndex++){
                //console.log(exerciseProcessedData[index].rawWorkOuts)
                //console.log(`sets in first workout: ${element.WorkOuts[workoutIndex].totalSets} sets in second workout ${element.WorkOuts[workoutIndex + 1].totalSets}`)
                exerciseProcessedData[index].processedWorkOuts.push({
                    setsChange: element.rawWorkOuts[workoutIndex].totalSets - element.rawWorkOuts[workoutIndex + 1].totalSets, 
                    repsChange: element.rawWorkOuts[workoutIndex].totalReps - element.rawWorkOuts[workoutIndex + 1].totalReps, 
                    avgWeightChange: element.rawWorkOuts[workoutIndex].avgWeight - element.rawWorkOuts[workoutIndex + 1].avgWeight,
                    volumeChange: element.rawWorkOuts[workoutIndex].volume - element.rawWorkOuts[workoutIndex + 1].volume})
            }
        })
        return exerciseProcessedData
    }

    generateProcessedWorkOutComparisonDataHTML = ()=>{
        let entireWorkOutsObject = this.compareExerciseDataBetweenWorkOuts()
        let trimmedWorkOutsObject = entireWorkOutsObject.map((element, index, array)=>{
            return {name: element.name, processedWorkOuts: element.processedWorkOuts}
        })
        let workoutChangesDiv = trimmedWorkOutsObject.map(exerciseName=>{
            let mainDateNum = new Date().getTime()
            while(mainDateNum === new Date().getTime()){

            }
            let workoutChangesH3 = exerciseName.processedWorkOuts.map(workOutData=>{
                let setsClass, repsClass, avgWeightClass, volumeClass;
                if(workOutData.setsChange > 0)
                setsClass = 'positiveSpan'
                if(workOutData.setsChange < 0)
                setsClass = 'negativeSpan'
                else{
                    setsClass = 'zeroSpan'
                }
                if(workOutData.repsChange > 0)
                repsClass = 'positiveSpan'
                if(workOutData.repsChange < 0)
                repsClass = 'negativeSpan'
                else{
                    repsClass = 'zeroSpan'
                }
                if(workOutData.avgWeightChange > 0)
                avgWeightClass = 'positiveSpan'
                if(workOutData.avgWeightChange < 0)
                avgWeightClass = 'negativeSpan'
                else{
                    avgWeightClass = 'zeroSpan'
                }
                if(workOutData.volumeChange > 0)
                volumeClass = 'positiveSpan'
                if(workOutData.volumeChange < 0)
                volumeClass = 'negativeSpan'
                else{
                    volumeClass = 'zeroSpan'
                }

            let dateNum = new Date().getTime()
            while(dateNum === new Date().getTime()){

            }
            return (<h3 key={`processedDataH3${new Date().getTime()}`}><span className={
            setsClass}>sets change: {workOutData.setsChange} </span> 
            <span className={repsClass}>reps change: {workOutData.repsChange} </span><br/> 
            <span className={avgWeightClass}>avg weight change: {workOutData.avgWeightChange.toFixed(2)} </span>  
            <span className={volumeClass}>volume change: {workOutData.volumeChange} </span></h3>)



            })
            return(
                <div key={`processedDataDiv${new Date().getTime()}`}>
                    <h1>{exerciseName.name}</h1>
                    {workoutChangesH3}
                </div>
            )
        })
        console.log(trimmedWorkOutsObject)
        return workoutChangesDiv
    }

    render(){
        
        //console.log(this.state.WorkOutsObject)
        return (
        <div>
            <h1>this is the Report component</h1>
            {this.generateProcessedWorkOutComparisonDataHTML()}
        </div>
    )
}
}

export default Report;