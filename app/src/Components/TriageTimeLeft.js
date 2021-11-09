/**
 * Function to calculate time left before patient need attention.
 * 
 * David Råsberg and Gustav, inspiration drawn from this https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 * 
 * 2021-11-5: Works to functional requirements, but results in "warning".
 * 
 */

import { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react';

export default function TriageTimeLeft(props) {
    let timeChecked = props.timeChecked;
    let checkPatientNowWarning = false;
    //Calculates time to check on patient.
    const calculateTimeToCheck = (timeChecked) => {
        return (new Date(timeChecked + (5 * 60 * 1000)));
    };

    let timeToCheck = calculateTimeToCheck(timeChecked); //last time checked + 5 minutes

    const calculateTimeLeft = (timeToCheck) => {
        let now = Date.now();
        let timeLeft;
        if ((timeToCheck - now) > 0) {
            timeLeft = new Date(timeToCheck - now);
        } else {
            checkPatientNowWarning = true;
            timeLeft = new Date(now - timeToCheck);
        }

        let timeLeftMap = {
            minutes: timeLeft.getMinutes(),
            seconds: timeLeft.getSeconds()
        }
        return timeLeftMap;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timeToCheck));

    //useEffect will fire after each render and update
    useEffect(() => {
        let isMounted = true
        setTimeout(() => {
            if (isMounted) {
                setTimeLeft(calculateTimeLeft(timeToCheck));
            }
        }, 1000);
        return () => { isMounted = false }
    });

    let timerComponents = [];

    //loop over each property in timeLeft
    Object.keys(timeLeft).forEach((interval, index) => {
        timerComponents.push(
            <span key={index}>
                {timeLeft[interval] < 10 ? "0" : ""}
                {interval === "seconds" ? timeLeft[interval] : timeLeft[interval] + ":"}
            </span>
        );
    });

    if (checkPatientNowWarning) {
        timerComponents = [<Icon key={"icon_" + timeChecked} name='warning' color='red' />, "-", ...timerComponents];
    };
    return (
        <>
            {timerComponents}
        </>
    );
}