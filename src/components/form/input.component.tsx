import React, { ChangeEventHandler, ReactNode} from "react";
import { Input } from "antd";
import { useController } from "react-hook-form";

export interface IClassProps {
  classes?: string | null;
}
export interface IInputProps extends IClassProps {
  id: string;
  changeHandle:ChangeEventHandler<HTMLInputElement>
}
export interface ITextInput extends IInputProps {
  type: string;
}
export interface IPasswordInput extends IInputProps {}
export interface IInputLabel extends IClassProps {
  htmlFor: string | undefined;
  children: ReactNode;
}
export const TextInputComponent = (props: Readonly<ITextInput>) => {
  //custom component
  // console.log(props);
  //props = {}  => not allowed as props are read only

  return (
    <React.Fragment>
      <Input //Built in component from antD
        type={props.type}
        id={props.id}
        placeholder={`Enter your ${props.id} here..... `}
        className={`${props.classes}`}
        // onChange={(event) =>{
        //   // console.log(event) => logs current target and target with diffrernt props
        //   console.log(event.target.value)
        // }}
        onChange={props.changeHandle}
      />

      <span></span>
    </React.Fragment>
  );
};



interface IInputTextHook {
  name:string,
  control:any,
  type:string,
  classes?: string | null

}
export const TextInputComponentHook = (props: Readonly<IInputTextHook>) => {
  const {field} = useController({
    name:props.name,
    control: props.control
  })
  return (
    <React.Fragment>
      <Input
        type={props.type}
        placeholder={`Enter your ${props.name} here..... `}
        className={`${props.classes}`}
        {...field}
        
      />
      
    </React.Fragment>
  );
};




export const PasswordInputComponent = ({
  id,
  classes = "",
  changeHandle
}: Readonly<IPasswordInput>) => {
  return (
    <>
      <Input.Password
        id={id}
        className={`${classes}`}
        placeholder={`Enter your ${id} here.....`}
        onChange={changeHandle}
      />
      <span></span>
    </>
  );
};

export const InputLabel = ({
  htmlFor,
  classes = "",
  children,
}: Readonly<IInputLabel>) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`${classes}`}>
        {children}
      </label>
    </>
  );
};
