import {InputProps} from "../types/InputProps";
import React, {useContext} from "react";
import {FormContext} from "../components/SimpleForm";

interface UseInputProps extends Pick<InputProps, 'source' | 'validate'> {}

function useInput(props: UseInputProps) {
    const {setValues, values, setErrors, errors} = useContext(FormContext);
    const onChange = React.useCallback((v: string | number) => {
        setValues({
            ...values,
            [props.source]: v,
        });
    }, [values, props.source]);

    const onErrorChange = React.useCallback((v: string, b: boolean) => {
        setErrors({
            ...errors,
            [props.source]:[vaildate(v), b]
        })
    }, [errors, props.source])

    const vaildate = (value:string) => {
        const vaildations = props.validate
        if(value.length == 0 && vaildations?.[2])
            return 1
        else if(value.length < vaildations?.[0])
            return 2
        else if(value.length > vaildations?.[1])
            return 3
        return 0
    }
    
    return {
        value: values[props.source], 
        onChange, 
        error:errors?.[props.source], 
        onErrorChange
    }
}

export default useInput;