import "./DisplayTime.css"

export const DisplayTime = (props) => {
    

    return (
        <>
            <div className="label">
                <div>{props.name}: {props.time}</div> 
                <center><button onClick={()=>{props.onRemove(props.keyItem)}}>Delete</button></center>
            </div>
        </>
    )
}