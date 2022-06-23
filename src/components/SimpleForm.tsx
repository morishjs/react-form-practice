import React, {createContext, PropsWithChildren, useEffect} from 'react';

export const FormContext = createContext({
    setValues: (v: any) => {},
    values: {} as Record<string, any>,
    setErrors: (v: any) => {},
    errors: {} as Record<string, [number, boolean]>,
})

const SimpleForm = ({children}: PropsWithChildren<{}>) => {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const value = React.useMemo(() => ({
        setValues, 
        values,
        setErrors,
        errors
    }), [
        setValues, 
        values,
        setErrors,
        errors
    ])

    const onClick = (e: any) => {
        e.preventDefault();
        let isVaild = true
        let temp:any = {...errors}

        Object.keys(errors).forEach(key => {
            if(errors[key]?.[0] > 0){
                isVaild = false
                temp[key] = [errors[key]?.[0], true]
            } 
        })
        if(isVaild)
            alert(JSON.stringify(values));
        else
            setErrors({...temp})
    }
    const init_error = () => {
        let temp:any = {}
        Object.keys(children).forEach(key => {
            const name = children[key].props.source
            const code = children[key].props.validate?.[2] ? 1 : 0
            
            temp[name] = [code, false]
        })
        setErrors({...temp})
    }
    
    useEffect(() => {
        init_error()
    }, [])
    
    return (
        <FormContext.Provider value={value}>
            <form>
                {children}
                <button type={'submit'} onClick={onClick}>
                    제출
                </button>
            </form>
        </FormContext.Provider>
    );
};

export default SimpleForm;
