import SimpleForm from "../components/SimpleForm";
import TextField from "../components/TextField";

function UserInfoForm(): JSX.Element {
    const required = true
    const min = (num:number) => {return num}
    const max = (num:number) => {return num}

    return (
        <SimpleForm>
            <TextField validate={[min(5), max(10), required]} source={'name'} label={'이름'}/>
            <TextField validate={[min(5), max(10), required]} type='password' source={'password'} label={'비밀번호'}/>
        </SimpleForm>
    );
}

export default UserInfoForm;
