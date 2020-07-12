import React, { useEffect, useRef } from 'react';

const Time = ({ time, unit }) => {
  const unitString = (time > 1)
    ? `${unit}s`
    : unit;

  if (time > 0) {
    return (
      <span> {time} {unitString} </span>
    );
  }
};

export default function Countdown({ setCounter, timeRemaining }) {
  const timeOut = useRef(null);
  useEffect(() => {
    if (timeRemaining >= 0) timeOut.current = setTimeout(setCounter, 1050);
    /* setTimeout is not accurate but it only affects visual data because
     * the time that the delay actually relies on is from the server anyway
     * You'll just have to refresh the page for it to count down properly.. 
     * * * * * */
    return () => clearTimeout(timeOut.current);
  }, [timeRemaining]);

  const hours = Math.floor(timeRemaining / (60 * 60));

  const remainingSecondsForMinutes = timeRemaining % (60 * 60);
  const minutes = Math.floor(remainingSecondsForMinutes / 60);

  const remainingSeconds = remainingSecondsForMinutes % 60;
  const seconds = Math.ceil(remainingSeconds);

  return (
    <> 
      {(hours > 0) && <Time time={hours} unit="hour" />}
      {(minutes > 0) && <Time time={minutes} unit="minute" />}
      {(seconds > 0) && <Time time={seconds} unit="second" />}
      {(timeRemaining > 0) && <p>until the message arrives!</p>}
    </>
  );
}
