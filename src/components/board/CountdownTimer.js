import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@mui/material';

const CountdownTimer = ({ created_date, created_time, durationInMonths, children }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = moment(`${created_date + created_time}`, 'DD MMM YYYY hh:mm A').add(durationInMonths, 'months');
      const diff = endDate.diff(moment());
      return moment.duration(diff);
    };

    setTimeLeft(calculateTimeLeft());
  }, [created_date, created_time, durationInMonths]);

  return (
    <>
      <Box
        direction="row"
        sx={{
          fontSize: '12px'
        }}
      >
        {timeLeft && (
          <>
            {' '}
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
            <span>
              {timeLeft.seconds()} <span style={{ paddingRight: '5px' }}> Sec</span>
            </span>
          </>
        )}
      </Box>
      {children}
    </>
  );
};

export default CountdownTimer;
