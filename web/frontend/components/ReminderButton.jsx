import { useEffect, useState } from 'react';
import '../assets/reminder-button.css';
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';
import { useButtonContext } from './ReemindmeContext';

export function ReminderButton() {
    let {buttonBorderRadius, buttonColor } = useButtonContext();
    buttonColor = `hsl(${buttonColor.hue}, ${buttonColor.saturation * 100}%, ${buttonColor.brightness * 100}%)`;  

    const buttonStyle = {
        borderRadius: buttonBorderRadius / 2,
        color: buttonColor,
        borderColor: buttonColor
    }

    return (
        <button is="reemindme-button" style={buttonStyle}>
            Reemind Me!
        </button>
    );
}