import React, {useState} from 'react'
import WorkOut from './WorkOuts/WorkOut'
import ManageExercises from './WorkOuts/exercises/ManageExercises'
import Report from './WorkOuts/Reports/Report'
require('./style.css')


function App() {
  
  //const [localStorageCount, incrementLocalStorageCount] = useState(0)
  if(localStorage.WorkOuts === undefined){ 
    localStorage.WorkOuts = `{"WorkOuts": []}`
  }
  if(localStorage.exerciseList === undefined){
    localStorage.exerciseList = `{"exercisesArray": []}`
  }
  const [WorkOutsStateObject, updateWorkOutsObject] = useState(JSON.parse(localStorage.WorkOuts))

    function addWorkOut(){
      let dateOfNewWorkOut = document.getElementById('newWorkOutDate').value
      let WorkOutsObject = JSON.parse(localStorage.WorkOuts)
      WorkOutsObject.WorkOuts.push({date: dateOfNewWorkOut, exercises: []})
      localStorage.WorkOuts = JSON.stringify(WorkOutsObject)
      updateWorkOutsObject(WorkOutsObject)
      document.location.reload()
  }
    WorkOutsStateObject.WorkOuts.sort(function(elementA, elementB) {
    if(elementA.date > elementB.date)
    return -1
    else if(elementA.date < elementB.date)
    return 1
    else return 0
  })


    let WorkOutComponents = WorkOutsStateObject.WorkOuts.map((element, index)=>{
      let dateNum = new Date().getTime()
      while(dateNum === new Date().getTime()){

      }
      return (<WorkOut 
        WorkOutsObject={WorkOutsStateObject} UpdateWorkOutsObject={updateWorkOutsObject}
        index={index}

        exercises={element.exercises} key={`WorkOut${dateNum}`} date={element.date} />
        )
    })
    return (
      <div className="AppDiv">
        <ManageExercises /><br></br>
        Add New Workout <input id="newWorkOutDate" type="date"/><button onClick={addWorkOut}>Add</button><br/>
        <Report WorkOutsObject={WorkOutsStateObject} UpdateWorkOutsObject={updateWorkOutsObject} />
        {WorkOutComponents}
      </div>
    )
  }

export default App;
