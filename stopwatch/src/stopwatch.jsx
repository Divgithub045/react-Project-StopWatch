import { useState,useRef,useEffect } from "react";
function Stopwatch ()
{
    const[isRunning,setIsRunning]=useState(false);
    const[elapsed,setElapsed]=useState(0);
    const interval = useRef(null);
    const startTime = useRef(0);
    useEffect(()=>{
        if (isRunning)
        {
            interval.current=setInterval(()=>{
                setElapsed(Date.now()-startTime.current)
            },10);
        }
        return ()=>{
            clearInterval(interval.current);
        }
    },[isRunning]);
    function start()
    {
        setIsRunning(true);
        startTime.current = Date.now()-elapsed;

    }
    function stop()
    {
        setIsRunning(false);

    }
    function reset()
    {
        setElapsed(0);
        setIsRunning(false);
    }
    function formatTime()
    {
        let hours = Math.floor(elapsed/(1000*60*60));
        let minutes = Math.floor(elapsed/(1000*60)%60);
        let seconds = Math.floor(elapsed/(1000)%60);
        let milliseconds = Math.floor(elapsed%1000)/10;
        hours = String(hours).padStart(2,'0');
        minutes = String(minutes).padStart(2,'0');
        seconds = String(seconds).padStart(2,'0');
        milliseconds = String(milliseconds).padStart(2,'0');

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }
    return (
        <>
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-btn" onClick={start}>Start</button>
                <button className="stop-btn" onClick={stop}>Stop</button>
                <button className="reset-btn" onClick={reset}>Reset</button>
            </div>
        </div>
        </>
    )
}
export default Stopwatch;