import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@mui/material';

const CountdownTimer = ({ created_date, created_time, dividenDate, children }) => {
  const targetTime = moment(dividenDate);

  console.log('targetTime', targetTime);
  console.log('created_date', created_date);

  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  const totalTime = targetTime.diff(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log('precentage', (currentTime / totalTime) * 100);

  return (
    <>
      <Box
        direction="row"
        sx={{
          fontSize: '12px',
          textAlign: 'start'
        }}
      >
        {/* <span>
          {timeBetween.years()} <span style={{ paddingRight: '5px' }}> Years :</span>
        </span>
        <span>
          {timeBetween.months()} <span style={{ paddingRight: '5px' }}> Months :</span>
        </span>

        <span>
          {timeBetween.days()} <span style={{ paddingRight: '5px' }}> Days :</span>
        </span>
        <span>
          {timeBetween.hours()} <span style={{ paddingRight: '5px' }}> Hours :</span>
        </span>
        <span>
          {timeBetween.minutes()} <span style={{ paddingRight: '5px' }}> Mins :</span>
        </span>
        <span>
          {timeBetween.seconds()} <span style={{ paddingRight: '5px' }}> s</span>
        </span> */}

        <div className="countdown-wrapper">
          <div className="countdown-item">
            {timeBetween.years()}
            <span>Years</span>
          </div>

          <div className="countdown-item">
            {timeBetween.months()}
            <span>months</span>
          </div>

          <div className="countdown-item">
            {timeBetween.days()}
            <span>days</span>
          </div>

          <div className="countdown-item">
            {timeBetween.hours()}
            <span>hours</span>
          </div>

          <div className="countdown-item">
            {timeBetween.minutes()}
            <span>minutes</span>
          </div>

          <div className="countdown-item">
            {timeBetween.seconds()}
            <span>seconds</span>
          </div>
        </div>
      </Box>
      {children}

      {/* <Timepurejs /> */}
    </>
  );
};

export default CountdownTimer;
