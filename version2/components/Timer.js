import React, { useEffect, useState } from 'react'
import moment from 'moment' 

const Timer = ({seconds, handleEndCollaboration, collabId}) => {

  const [secondsLeft, setSecondsLeft] = useState(seconds)

  useEffect(() => {

    if (!secondsLeft) { return handleEndCollaboration(collabId)}

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [secondsLeft, handleEndCollaboration, collabId])

  return (
    <div className="timer">
      {secondsLeft && moment.utc(secondsLeft * 1000).format('HH:mm:ss')}
    </div>
  )
}


export default Timer


// class Timer extends React.Component {
//     state = {
//         secondsLeft: 0,
//         intervalIds: []
//     }

//     componentDidMount() {
//         const { seconds } = this.props;
//         this.setState({ secondsLeft: seconds });
        
//     }

//     componentDidUpdate() {
//         const { handleEndCollaboration, collabId } = this.props;
//         const { secondsLeft } = this.state;
//         if (!secondsLeft) {
//             this.unSubToEndCollaboration = handleEndCollaboration(collabId);
//             return;
//         }

//         const intervalId = setInterval(() => {
//             this.setState(state => {
//                 const list = state.intervalIds.concat(intervalId);
//                 return {
//                     secondsLeft: secondsLeft - 1,
//                     intervalIds: list
//                 }
//             });
//             clearInterval(intervalId);
//         }, 1000);
        
//     }

//     componentWillUnmount(){
//         this.state.intervalIds.forEach(intervalId => clearInterval(intervalId));
//         console.log("WILLUNMOUNT")
//         console.log(this.unSubToEndCollaboration);
//     }

//     render() {
//         return (
//             <div className="timer">{moment.utc(this.state.secondsLeft * 1000).format("HH:mm:ss")}</div>
//         )
//     }


// }

// export default Timer;