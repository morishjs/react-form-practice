import {FunctionComponent} from 'react';
import {InputProps} from "../types/InputProps";
import useInput from "../hooks/useInput";

const TextField: FunctionComponent<InputProps> = ({source, label, placeholder, type, validate}) => {
    const {value = '', onChange, error, onErrorChange} = useInput({source, validate});
    const getMsg = () => {
        switch(error[0]){
            case 1:
                return label + '은 필수 입니다';
            case 2:
                return '최소 ' + validate?.[0] + '자 입력해주세요';
            case 3:
                return '최대 ' + validate?.[1] + '자 입력해주세요';
            default:
                return null;
        }
    }

    return (
        <div style={{display: 'flex', gridGap: '8px', margin: 10}}>
            <label htmlFor={source}>{label}</label>
            <input value={value} onChange={e => {
                onChange(e.target.value)
                onErrorChange(value, false)
            }} 
            name={source} type={type}
            placeholder={placeholder} 
            onFocus={() => onErrorChange(value, false)} 
            onBlur={() => onErrorChange(value, true)}/>
            <div style={{color:'tomato'}}>{error?.[1] && getMsg()}</div>
        </div>
    );
};

export default TextField;
