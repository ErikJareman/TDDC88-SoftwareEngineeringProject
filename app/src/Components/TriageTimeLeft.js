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


export default function TriageTimeLeft(timeChecked) {
    const arrival = new Date(timeChecked.timeChecked);

    const calculateTimeLeft = () => {
        //console.log(arrival);
        let now = new Date();
        let timeLeft = {
            hour: now.getHours() - arrival.getHours(),
            minutes: now.getMinutes() - arrival.getMinutes(),
            seconds: now.getSeconds() - arrival.getSeconds()
        }
        //console.log(timeLeft);
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    //useEffect will fire after each render and update
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    //loop over each property in timeLeft
    Object.keys(timeLeft).forEach((interval) => {

        timerComponents.push(
            <>
                {interval < 10 ? "0" : ""}
                {interval === "seconds" ? + timeLeft[interval] : + timeLeft[interval] + ":"}
            </>
        );
        console.log(timerComponents[0]);
    });
    return (
        <>
            {timerComponents.length ? timerComponents : <span>!</span>}
        </>
    );
}