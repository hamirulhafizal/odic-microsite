import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@mui/material';

// const Timepurejs = () => {
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const countdown = tomorrow - today;

//   setInterval(function () {
//     const now = new Date();
//     const distance = tomorrow - now;

//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     console.log(hours + 'h ' + minutes + 'm ');
//   }, 1000);
// };

const CountdownTimer = ({ created_date, created_time, dividenDate, children }) => {
  // const [timeLeft, setTimeLeft] = useState(null);

  // useEffect(() => {
  //   const calculateTimeLeft = () => {
  //     // const endDate = moment(`${created_date + created_time}`, 'DD MMM YYYY hh:mm A').add(durationInMonths, 'months');
  //     const diff = dividenDate.diff(moment());
  //     return moment.duration(diff);
  //   };

  //   setTimeLeft(calculateTimeLeft());
  // }, [dividenDate]);

  return (
    <>
      <Box
        direction="row"
        sx={{
          fontSize: '12px',
          textAlign: 'start'
        }}
      >
        {dividenDate} <br />
        {created_time} <br />
        {/* {timeLeft && (
          <>
            <span>
              {timeLeft.years()} <span style={{ paddingRight: '5px' }}> Years :</span>
            </span>
            <span>
              {timeLeft.months()} <span style={{ paddingRight: '5px' }}> Months :</span>
            </span>
            <span>
              {timeLeft.days()} <span style={{ paddingRight: '5px' }}> Days :</span>
            </span>
            <span>
              {timeLeft.hours()} <span style={{ paddingRight: '5px' }}> Hours :</span>
            </span>
            <span>
              {timeLeft.minutes()} <span style={{ paddingRight: '5px' }}> Mins :</span>
            </span>
          </>
        )} */}
      </Box>
      {children}

      {/* <Timepurejs /> */}
    </>
  );
};

export default CountdownTimer;
