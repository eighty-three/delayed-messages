import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as workerTimers from 'worker-timers';

import Time from '@/components/Time';

const propTypes = {
  setCounter: PropTypes.func,
  timeRemaining: PropTypes.number
};

const Countdown = ({ setCounter, timeRemaining }) => {
  const timeOut = useRef(null);
  useEffect(() => {
    timeOut.current = workerTimers.setTimeout(setCounter, 1000);
    return () => workerTimers.clearTimeout(timeOut.current);
  }, [timeRemaining]);

  const hours = Math.floor(timeRemaining / (60 * 60));

  const remainingSecondsForMinutes = timeRemaining % (60 * 60);
  const minutes = Math.floor(remainingSecondsForMinutes / 60);

  const remainingSeconds = remainingSecondsForMinutes % 60;
  const seconds = Math.ceil(remainingSeconds);

  return (
    <> 
      {(timeRemaining !== 0)
        ? (
          <>
            <Time hours={hours} minutes={minutes} seconds={seconds} />
            <span> until the message arrives!</span>
          </>
        ) : (
          <p>Getting your message..</p>
        )}
    </>
  );
};

Countdown.propTypes = propTypes;

export default Countdown;
