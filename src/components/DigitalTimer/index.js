import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutesTime: 25,
    timerValue: 25,
    secondsTime: 0,
    timerStarted: false,
  }

  startTimer = () => {
    this.timerID = setInterval(this.decreaseSeconds, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timerID)
  }

  startOrStopTimer = () => {
    const {timerStarted} = this.state

    this.setState(prevState => ({timerStarted: !prevState.timerStarted}))

    if (timerStarted) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  resetTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      timerValue: 25,
      minutesTime: 25,
      secondsTime: 0,
      timerStarted: false,
    })
  }

  decreaseSeconds = () => {
    const {secondsTime, minutesTime} = this.state

    let newSeconds = secondsTime - 1
    let newMinutes = minutesTime
    if (newSeconds === -1) {
      newSeconds = 59
      newMinutes -= 1
    }
    this.setState({minutesTime: newMinutes, secondsTime: newSeconds})
  }

  increaseMinutes = () => {
    this.setState(prevState => ({
      minutesTime: prevState.minutesTime + 1,
      timerValue: prevState.timerValue + 1,
    }))
  }

  decreaseMinutes = () => {
    const {timerStarted} = this.state
    if (timerStarted === false) {
      this.setState(prevState => ({
        minutesTime: prevState.minutesTime - 1,
        timerValue: prevState.timerValue - 1,
      }))
    }
  }

  render() {
    const {minutesTime, secondsTime, timerStarted, timerValue} = this.state

    let newSecondsTime = secondsTime
    if (secondsTime < 10) {
      newSecondsTime = '0'.concat(secondsTime.toString())
    }
    return (
      <div className="main-container">
        <div className="sub-container">
          <h1 className="heading">Digital timer</h1>
          <div className="timer-interact-container">
            <div className="timer-display-container">
              <div className="display-background">
                <h1 className="heading heading1">
                  {minutesTime}:{newSecondsTime}
                </h1>
                <p className="para2">{!timerStarted ? 'Paused' : 'Running'}</p>
              </div>
            </div>
            <div className="timer-settings-container">
              <div className="timer-actions-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.startOrStopTimer}
                >
                  {!timerStarted ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="image"
                      alt="play icon"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="image"
                      alt="pause icon"
                    />
                  )}
                  {!timerStarted ? 'Start' : 'Pause'}
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="image"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
              <p className="para">Set Timer limit</p>
              <div className="timer-limit-container">
                <button
                  className="button button1"
                  type="button"
                  onClick={this.decreaseMinutes}
                >
                  -
                </button>
                <p className="para1">{timerValue}</p>
                <button
                  className="button button1"
                  type="button"
                  onClick={this.increaseMinutes}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
