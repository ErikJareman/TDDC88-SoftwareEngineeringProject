/**
 * NameDisplay.js
 *
 * A component to always display Name and personal number of the patients - Nikil johny - DRAFT
 *
 * Documentation not complete.
 * 
 * We have defined two variables to store the name and personal number
 * and displayed it accordingly.
 * function NameDisplay() - Nikil
 */
 
 import React from 'react'
 import { Message,Icon } from 'semantic-ui-react'
 
 //Name of the person
 var name= "Frederik";
 //personal number
 var pnum= "12345678-9123";

 var shortreason = "High Fever";

 //function to display the information.
 const NameDisplay = () => (
    <>
    <div>
     <Message visible color='red'>{name} , {pnum} ,   
       Sökorsak : <Icon disabled name='search plus' />{shortreason}
     </Message>
    </div>
    </>
 )
 
 export default NameDisplay
 
  