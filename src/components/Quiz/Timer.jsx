import { useEffect, useState } from 'react';

function Timer({ timed, timerCallback }) {
  let countDownTime;
  if (typeof window !== 'undefined') {
    countDownTime = localStorage.getItem('count_down_time_for_exam');
  }

  const [hours, setHours] = useState(countDownTime?.split(':')[0]);
  const [minutes, setMinutes] = useState(countDownTime?.split(':')[1]);
  const [seconds, setSeconds] = useState(countDownTime?.split(':')[2]);

  useEffect(() => {
    let interval;

    if (timed) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds == 0 && minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }

        if (seconds == 0 && minutes == 0 && hours > 0) {
          setMinutes(59);
          setSeconds(59);
          setHours(hours - 1);
        }

        localStorage.setItem(
          'count_down_time_for_exam',
          `${hours?.toString().padStart(2, '0')}:${minutes
            ?.toString()
            .padStart(2, '0')}:${seconds?.toString().padStart(2, '0')}`
        );
      }, 1000);

      if (hours == 0 && minutes == 0 && seconds == 0) {
        clearTimeout(interval);
      }
    }

    return () => {
      clearTimeout(interval);
    };
  }, [seconds, minutes, hours]);

  timerCallback(hours, minutes, seconds);

  return (
    <div>
      Time Remaining:{' '}
      {`${
        hours != '00' || hours != undefined
          ? hours?.toString().length < 2
            ? '0' + hours
            : hours
          : ''
      }:${minutes?.toString().length < 2 ? '0' + minutes : minutes}:${
        seconds?.toString().length < 2 ? '0' + seconds : seconds
      } `}
    </div>
  );
}

export default Timer;
