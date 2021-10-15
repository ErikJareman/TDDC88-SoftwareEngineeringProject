/**
 *TeamView.js
 *
 * A component to always display Name of the team under which the patient is assigned - Nikil johny - DRAFT
 *
 * Documentation not complete.
 *
 * We will just view the data using the state.
 * function TeamView() - Nikil
 */

 import React from 'react';
 import { useLocation } from "react-router-dom";

 export default function TeamView() {
    const { state } = useLocation();
     return (
         <div>
             <h5>Team : {state.patients.team}</h5>
         </div>
     )
 }
 