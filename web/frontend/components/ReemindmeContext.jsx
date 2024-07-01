import React, { useContext, useState, useCallback } from "react";

const SaveContext = React.createContext();

const FormContext = React.createContext();
const FormUpdateContext = React.createContext();
const ButtonContext = React.createContext();
const ButtonUpdateContext = React.createContext();

export function useSaveContext() {
    return useContext(SaveContext);
}

export function useFormContext() {
    return useContext(FormContext);
}

export function useFormUpdateContext() {
    return useContext(FormUpdateContext);
}

export function useButtonContext() {
    return useContext(ButtonContext);
}

export function useButtonUpdateContext() {
    return useContext(ButtonUpdateContext);
}

export function ReemindmeSettingsProvider({ children }) {
    const [save, setSave] = useState(false);

    const [formColor, setFormColor] = useState({
        hue: 0,
        brightness: 1,
        saturation: 1,
    });
    const [buttonColor, setButtonColor] = useState({
        hue: 0,
        brightness: 1,
        saturation: 1,
    });

    const [buttonBorderRadius, setButtonBorderRadius] = useState(5);


    const formColorChange = useCallback(
        (value) => {
            setFormColor(value);
            setSave(s => !s);
        },
        []
    );
    const buttonColorChange = useCallback(
        (value) => {
            setButtonColor(value);
            setSave(s => !s);
        },
        []
    );
    const buttonBorderRadiusChange = useCallback(
        (value) => {
            setButtonBorderRadius(value);
            setSave(s => !s);
        },
        []
    );


    return (
        <SaveContext.Provider value={save}>
            <FormContext.Provider value={formColor}>
                <FormUpdateContext.Provider value={formColorChange}>
                    <ButtonContext.Provider value={{ buttonBorderRadius, buttonColor }}>
                        <ButtonUpdateContext.Provider value={{ buttonBorderRadiusChange, buttonColorChange }}>
                            {children}
                        </ButtonUpdateContext.Provider>
                    </ButtonContext.Provider>
                </FormUpdateContext.Provider>
            </FormContext.Provider >
        </SaveContext.Provider>
    )
}