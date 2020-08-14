import React from 'react';

import PropTypes from 'prop-types';

const fixString = (time, unit) => {
  return (time > 1)
    ? `${unit}s`
    : unit;
};

const propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number
};

const Time = ({ hours, minutes, seconds }) => {
  // I thought it'd be funny but it just looks incredibly stupid
  return (
    <>
      {(hours > 0) && <span>{hours} {fixString(hours, 'hour')}</span>}

      {(hours > 0 && minutes > 0) && (seconds > 0) && <span>, </span>}
      {(hours > 0 && minutes > 0 && seconds === 0) && <span> and </span>}

      {(minutes > 0) && <span>{minutes} {fixString(minutes, 'minute')}</span>}

      {((hours > 0 || minutes > 0) && seconds > 0) && <span> and </span>}

      {(seconds > 0) && <span>{seconds} {fixString(seconds, 'second')}</span>}
    </>
  );
};

Time.propTypes = propTypes;

export default Time;
