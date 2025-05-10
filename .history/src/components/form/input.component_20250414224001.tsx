import React, { ReactNode, useState} from "react";
import { Select, Input,Radio,Button } from "antd";
import { Controller, useController } from "react-hook-form";

export interface IClassProps {
  classes?: string | null;
}
export interface IInputProps extends IClassProps {
  id: string;
  errorMsg? : string | null
  // changeHandle:ChangeEventHandler<HTMLInputElement>
  control:any
  type:string
}
export interface ITextInput extends IInputProps {
  type: string;
}
export interface IPasswordInput extends IInputProps {}
export interface IInputLabel extends IClassProps {
  htmlFor: string | undefined;
  children?: ReactNode; 

  
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
        // onChange={props.changeHandle}
      />

      <span></span>
    </React.Fragment>
  );
};



interface IInputTextHook {
  name:string,
  control:any,
  type?:string,
  classes?: string | null
  errorMsg?: string | null
  options?:Array<{label:String, value:string}>
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


export const TextInputComponentController = (props: Readonly<IInputTextHook>) => {
  return (
    <>
    <Controller
      name={props.name}
      control={props.control}
      render={({field}
        
      )=>{
        return (
          <>
        <Input
          type={props.type}
          id={props.name}
          status={props.errorMsg ? "error" : ''}
          placeholder={`Enter your ${props.name}`}
          {...field}
        />
        <span className="text-sm text-red-400 italic">{props?.errorMsg}</span>
          </>
        )
      }}
    ></Controller>
    </>
  );
};

export const TextAreaComponentController = (props: Readonly<IInputTextHook>) => {
  return (
    <>
    <Controller
      name={props.name}
      control={props.control}
      render={({field}
        
      )=>{
        return (
          <>
        <Input.TextArea
          type={props.type}
          id={props.name}
          status={props.errorMsg ? "error" : ''}
          placeholder={`Enter your ${props.name}`}
          {...field}
        />
        <span className="text-sm text-red-400 italic">{props?.errorMsg}</span>
          </>
        )
      }}
    ></Controller>
    </>
  );
};



export const PasswordInputComponentController = (props: Readonly<IPasswordInput>) => {

  return (
    <>
    <Controller
      name={props.id}
      control={props.control}
      render={({field}) =>(
        <>
        <Input.Password
        id={props.id}
        type={props.type}
        className={`${props.classes}`}
        {...field}
        status={props.errorMsg ? "error" : ''}
        placeholder={`Enter your ${props.id} here.....`}
      />
      <span className="text-sm italic text-red-500">{props?.errorMsg}</span>
        </>
      )}
    />

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

export const RadioInputController =(props:Readonly<IInputTextHook>) =>{
  return(
    <>
    <Controller 
    name={props.name} 
    control={props.control}
    

      render={({field}) => (
        <>
          <Radio.Group
          {...field}
          options={props.options}/>
           <span className="text-sm italic text-red-500">{props?.errorMsg}</span>
        </>
      )}
    />
    </>
  )
}

interface ISelectInput {
  name:string,
  control:any
  errorMsg?: string | null
  options:Array<{label:String, value:string}>

}

export const SelectInputController =(props:Readonly<ISelectInput>) =>{
  return(
    <>
    <Controller
    name={props.name}
    control={props.control}
    render={({field}) =>(
      <>
        <Select 
        {...field}
        options={props.options}
        className="w-full"
        />
        <span className="text-sm italic text-red-500">{props.errorMsg}</span>
      </>
    )}
    />
    </>
  )
}



interface IAddressInput {
  name:string,
  control:any
  erroMsg?:string | null
  rows?:number | 1
  maxRows?:number | 3
}

export const AddressInputController = (props:Readonly<IAddressInput>) =>{
  return(
    <Controller 
      control={props.control}
      name={props.name}
      render={({field}) =>(
        <>
         <Input.TextArea
         {...field} 
         autoSize={{ minRows: props.rows as number, maxRows: props.maxRows as number }}
         placeholder="Enter your street, city, and postal code" />
         <span className="text-sm text-red-500 italic">{props.erroMsg}</span>
        </>
      )}
    
    />
  )
}


interface IButtonProps {
 isSubmitting?: boolean,
  children: React.ReactNode
  classes?:string
}
export const SubmitButton = (props: Readonly<IButtonProps>) => {
  return (
    <>
    <Button htmlType="submit" type="primary"
     disabled={props.isSubmitting} 
     className={props.classes}>{props.children}</Button>
    </>
  )
}

export const CancelButton = (props: Readonly<IButtonProps>) => {
  return (
    <>
    <Button htmlType="reset" type="primary"
     disabled={props.isSubmitting} 
     className="bg-red-700! text-white! h-10!">{props.children}</Button>
    </>
  )
}



import type { UploadProps, UploadFile } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";



interface IFileUploadProps{
  name:string,
  setValue:(name:string, file:any) =>void;
  thumbnail?:string | null
}

export const FormSingleImageUploader = ({name,setValue,thumbnail=''}:IFileUploadProps) =>{
  const [fileList, setFileList] = useState<UploadFile[]>([]);
    
const props: UploadProps = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    console.log(file)
    setFileList([file]);
    setValue(name, file as any)
    return false;
  },
  fileList,
};

  return (
    <>
     <div className="flex justify-start gap-10">
      <div>
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </div>
      <div>
        {fileList && fileList.length ? (
          <><img src={URL.createObjectURL(fileList[0] as any)} alt="" className=" h-[100px] w-[300px]"/></> //preparing image from object

          // for preloading image in edit banner
          ) : thumbnail ? <><img src={thumbnail} className="h-[100px] w-[300px]" alt="" /></>:<img src="https://placehold.co/300x75/white/teal?text=No Image" alt="alternate image"/>} 
      </div>
     </div>
    </>
  )
}