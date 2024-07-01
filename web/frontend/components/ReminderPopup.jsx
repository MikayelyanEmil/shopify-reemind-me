import { useEffect, useState } from 'react';
import '../assets/reminder-popup.css';
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';
import { useFormContext } from './ReemindmeContext';

export function ReminderPopup() {
    let formColor = useFormContext();

    // const fetch = useAuthenticatedFetch();
    // const [formBorderRadius, setFormBorderRadius] = useState("5px");
    // useEffect(async () => {
    //     try {
    //         const response = await fetch('/api/customization', {
    //             method: "Get",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const data = await response.json();
    //         setFormBorderRadius(data.formBorderRadius)
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, [test]);
 

    formColor = `hsl(${formColor.hue}, ${formColor.saturation * 100}%, ${formColor.brightness * 100}%)`;
    return (
        <form className='reminder-form' method="post" style={{borderColor: formColor}}>
            <div className='form-top' style={{color: formColor}}>
                ReemindMe
            </div>
            <label htmlFor="datePicker">Select Date</label>
            <input
                type="date"
                name="datePicker"
                id="datePicker" />
            <label htmlFor="email">Your email</label>
            <input
                type="email"
                name="email"
                id="customerEmail" />

            <input
                type="hidden"
                name="productId"
                id="productId"
                value="" />

            <input
                type="hidden"
                name="shop"
                id="shop"
                value="" />

            <button type="submit" className='submit-btn' style={{borderColor: formColor}}>Submit</button>
        </form>
    );
}