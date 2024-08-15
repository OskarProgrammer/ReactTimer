import { useEffect, useState } from 'react'
import "./App.css"
import { DisplayTime } from './components/DisplayTime'

const initialTimes = [
  {
    time: "21:22:22.22",
    key: crypto.randomUUID(),
    name: "Czas inicjalizacyjny"
  },
  {
    time: "22:22:11",
    key: crypto.randomUUID(),
    name: "Czas inicjalizacyjny 2"
  }
]

function App() {
  const [time, setTime] = useState(0)
  const [times, setTimes] = useState(initialTimes)
  let [seconds, setSeconds] = useState(0)
  let [minutes, setMinutes] = useState(0)
  let [hours, setHours] = useState(0)

  let [isActived, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
        if (isActived){
          setTime(time + 1);
          
          if (time == 1000) {setSeconds(seconds + 1); setTime(0)}
          if (seconds == 60) {setMinutes(minutes + 1); setSeconds(0)}
          if (minutes == 60) {setHours(hours + 1); setMinutes(0)}
        }
    }, 1);

    return () => clearInterval(interval);
  }, [time, isActived]);


  const deleteTimeStamp = (key) =>{
    const newTimeStamps = []
    for (let i = 0; i < times.length; i++){
      if (times[i].key != key){
        newTimeStamps.push(times[i])
      } 
    }

    setTimes(newTimeStamps)
  }


  const saveNewTimeStamp = () => {
    let name = prompt("Give name for the timestamp. ")
    
    const newTimeStamp = {
      time: `${hours}:${minutes}:${seconds}.${time}`,
      key: crypto.randomUUID(),
      name: name
    }

    const newTimeStamps = [...times, newTimeStamp]
    setTimes(newTimeStamps)
  }

  return (
    <>
      <div>
            <center>Timer</center> 

            <center>
              {hours}:{minutes}:{seconds}.{time}
            </center>
            
            <center>
              {isActived ? <button onClick={()=>{setIsActive(true)}} disabled>Start</button>: <button onClick={()=>{setIsActive(true)}}>Start</button>}
              {isActived ? <button onClick={()=>{setIsActive(false)}}>Stop</button> : <button onClick={()=>{setIsActive(false)}} disabled>Stop</button>}
              {time != 0 ? <button onClick={()=>{setMinutes(0); setHours(0);setSeconds(0); setTime(0)}} > Reset </button> : <button onClick={()=>{setMinutes(0); setHours(0);setSeconds(0); setTime(0)}} disabled> Reset </button>}
              {!isActived && time != 0 ? <button onClick={()=>{saveNewTimeStamp()}}>Save</button> : <button onClick={()=>{saveNewTimeStamp()}} disabled>Save</button>}
            </center>
      </div>
      
      {times.map((item)=>{return (
        <>
        <DisplayTime time={item.time} keyItem={item.key} name={item.name} onRemove={deleteTimeStamp}/> 
        </>
        )})}
    </>
  )
}

export default App
