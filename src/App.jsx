import { useEffect, useState } from 'react'
import "./App.css"


function App() {
  const [time, setTime] = useState(0)
  let [seconds, setSeconds] = useState(0)
  let [minutes, setMinutes] = useState(0)
  let [hours, setHours] = useState(0)

  let [isActived, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
        if (isActived){
          setTime(time + 1);

          setSeconds(time)

          if (seconds >= 60) {setMinutes(minutes + 1); setSeconds(0); setTime(0)}
          if (minutes >= 60) {setHours(hours + 1); setMinutes(0)}
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);


  return (
    <>
      <div>
            <center>
              {hours}:{minutes}:{seconds}
            </center>
            
            <center>
              <button onClick={()=>{setIsActive(true)}}>Start</button>
              {isActived ? <button onClick={()=>{setIsActive(false)}}>Stop</button> : <button onClick={()=>{setIsActive(false)}} disabled>Stop</button>}
              {isActived ? <button onClick={()=>{setMinutes(0); setHours(0);setSeconds(0); setTime(0)}}> Reset </button> : ""}
            </center>
      </div>
    </>
  )
}

export default App
