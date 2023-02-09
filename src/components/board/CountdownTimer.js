import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const CountdownTimer = ({ created_date, created_time, dividenDate, children }) => {
  const targetTime = moment(dividenDate);

  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          fontSize: '12px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: ' flex-start',
          flexDirection: 'column'
        }}
      >
        <Typography variant="span">
          {dividenDate.format('DD MMM YYYY')}{' '}
          {!matchDownSM && (
            <Typography variant="span">
              :
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {timeBetween.years()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>Y</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {timeBetween.months()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>M</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {timeBetween.days()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>D</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {timeBetween.hours()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>H</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {timeBetween.minutes()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>M</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {timeBetween.seconds()}{' '}
                <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>S</span>
              </span>
            </Typography>
          )}
        </Typography>
      </Box>

      {matchDownSM && (
        <Box
          sx={{
            fontSize: '12px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: '#fff7b37d',
            borderRadius: '2px',
            mt: 1
          }}
        >
          <Typography
            variant="span"
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '100%'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {timeBetween.years()} <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>Y</span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {timeBetween.months()}{' '}
              <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>M</span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {timeBetween.days()} <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>D</span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {timeBetween.hours()} <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>H</span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {timeBetween.minutes()}{' '}
              <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>M</span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {timeBetween.seconds()}{' '}
              <span style={{ marginLeft: '-5px', paddingRight: '5px', paddingLeft: '2px', fontSize: '10px' }}>S</span>
            </span>
          </Typography>
        </Box>
      )}

      {children}
    </>
  );
};

export default CountdownTimer;
