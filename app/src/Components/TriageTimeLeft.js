/**
 * Function to calculate time left before patient need attention.
 * 
 * David Råsberg, hugh amount of inspiration drawn from this https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 * Draft
 * 
 * 
 * 
 */

import { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react';

export default function TriageTimeLeft(timeChecked) {
    //cleaner way to take in variables needed
    let patient = timeChecked.timeChecked;
    let checkPatientNowWarning = false;
    //Calculates time to check on patient.
    const calculateTimeToCheck = (patient) => {
        const { timeChecked } = patient;
        return (new Date(timeChecked + (5 * 60 * 1000)));
    };

    let timeToCheck = calculateTimeToCheck(patient); //last time checked + 5 minutes

    const calculateTimeLeft = (timeToCheck) => {
        let now = Date.now();
        let timeLeft = new Date(timeToCheck - now);

        let timeLeftMap = {
            minutes: timeLeft.getMinutes(),
            seconds: timeLeft.getSeconds()
        }

        console.log(timeLeft);
        return timeLeftMap;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timeToCheck));

    //useEffect will fire after each render and update
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(timeToCheck));
        }, 1000);
    });

    const timerComponents = [];

    //loop over each property in timeLeft
    Object.keys(timeLeft).forEach((interval) => {
        //console.log(interval + ":" + timeLeft[interval]);
        timerComponents.push(
            <>

                {interval === "seconds" ? timeLeft[interval] : timeLeft[interval] + ":"}
            </>
        );
        //{timeLeft[interval] < 10 ? "0" : ""}
    });
    return (
        <>
            {timerComponents.length ? timerComponents : <Icon name='warning' />}
        </>
    );
}