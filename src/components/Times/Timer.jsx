
import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp,func}) {
  const {seconds, minutes} = useTimer({expiryTimestamp });
  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      func(); 
    }
  }, [seconds, minutes, func]);
  return (
      <div style={{ fontSize: '30px' }}>
        <span>{minutes}</span>:<span>{seconds>9?seconds:'0'+seconds}</span>
      </div>
  );
}
