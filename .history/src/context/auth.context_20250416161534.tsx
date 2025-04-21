import {
    createContext,
    Suspense,
    useContext,
    useEffect,
    useState,
  } from "react";
  import authSvc from "../services/auth.service";
  import {
    getLocalStorage,
    NotificationType,
    notifyUserRegistration,
    removeLocalStorage,
    setCookie,
    setLocalStorage,
    setSessionStorage,
  } from "../utilities/helpers";
  import { WebStorageConstant } from "../config/constats";
  import { useNavigate } from "react-router";
  import { Spin } from "antd";
  
  //create context
  export interface ICredentials {
    email: string;
    password: string;
  }


  export interface IAuthProvider {
    children: any;
  }
  
  export interface ILoggedInUserData {
    //from virtual dom => console.log
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    status: string;
    image: {
      optimizedUrl: string;
      url: string;
    };
    _id: string;
    createdAt: Date;
  }

  export const AuthContext = createContext({
    login: async (_credentials: ICredentials): Promise<void> => {}, //initail declaration
    forgetPasswordReq: async (_data: { email: string }): Promise<void> => {},
    loggedInUser: {} as ILoggedInUserData,
    setLoggedInUser: (_data: ILoggedInUserData) => {},
  });
  
  //use context : example: to provide context for abc componet
  
  /* <AuthContext.Provider value={{
      login: Function
  }}>
      <abc></abc>
  </AuthContext.Provider>
  
   */
  
  
  export const AuthProvider = ({ children }: IAuthProvider) => {
    const [loggedInUser, setLoggedInUser] = useState<ILoggedInUserData>();
    const [loading, setLoading] = useState<boolean>(true);
    // const naviage = useNavigate();
  
    const getLoggedInUser = async () => {
      try {
        setLoading(true);
        const userInfo = await authSvc.getRequest("/auth/me");
        console.log(userInfo);
        setLoggedInUser(userInfo?.result.data);
        return userInfo.result.data;
      } catch (exception) {
        throw exception;
      } finally {
        setLoading(false);
      }
    };
  
    const loginFunc = async (credentials: ICredentials) => {
      try {
        console.log(credentials) //gives email and username
        const response = await authSvc.postRequest("/auth/login", credentials);
        console.log(response);
        notifyUserRegistration("login Successfull", NotificationType.SUCCESS);
  
        setLocalStorage(
          WebStorageConstant.ACCESS_TOKEN,
          response.result.data.accessToken
        );
        setLocalStorage(
          WebStorageConstant.REFRESH_TOKEN,
          response.result.data.refreshToken
        );
  
        // const userInfo  = await authSvc.getRequest('/auth/me')
        // console.log(userInfo);
        // setLoggedInUser(userInfo?.result.data)
        // return userInfo.result.data
        return await getLoggedInUser();
  
        // notifyUserRegistration(`Welcome to ${userInfo.result.data.role} pannel`,NotificationType.SUCCESS)
        // naviage('/'+userInfo.result.data.role)
  
        // setCookie(WebStorageConstant.ACCESS_TOKEN,response.result.data.accessToken,2)
        // setCookie(WebStorageConstant.REFRESH_TOKEN,response.result.data.refreshToken,2)
  
        // setSessionStorage(WebStorageConstant.ACCESS_TOKEN,response.result.data.accessToken)
        // setSessionStorage(WebStorageConstant.REFRESH_TOKEN,response.result.data.refreshToken)
      } catch (exception: any) {
        console.log("Exception :", exception); //gives message and status as set in authSvc.postRequest
        const errorMessage =
          exception.response?.message || "An unexpected error occurred";
        console.log("Error message :", errorMessage);
        notifyUserRegistration(errorMessage, NotificationType.ERROR);
      }
    };
  
    const forgetPasswordReq = async (data: { email: string }) => {
      //api to send forgetPassword Request
  
      try {
        const response = await authSvc.postRequest("/auth/forget-password", data);
        console.log(response);
        notifyUserRegistration(
          "An email has been forwarded to your registered email to reset your password",
          NotificationType.SUCCESS
        );
      } catch (exception) {
        console.log(exception);
        notifyUserRegistration(
          "Error occured while sending forget pasword request. Please try again later.",
          NotificationType.ERROR
        );
      }
    };
  
    //hydrating and dehydration of state (context dehydration occures when hard reload so needs to rehydrate)
  
    // hydrating the state
    useEffect(() => {
      let token = getLocalStorage(WebStorageConstant.ACCESS_TOKEN);
      // console.log(token);
      if (token) {
        getLoggedInUser();
      }else{
          setLoading(false)
      }
    }, []);
  
    //   console.log({ loggedInUser });
  
    return (
      <>
        <Suspense fallback={<Spin fullscreen></Spin>}>
          <AuthContext.Provider
            value={{
              login: loginFunc,
              forgetPasswordReq,
              loggedInUser: loggedInUser as ILoggedInUserData,
              setLoggedInUser,
            }}
          >
            {loading ? <Spin fullscreen></Spin> : children}
          </AuthContext.Provider>
        </Suspense>
      </>
    );
  };
  
  export const useAuth = () => {
    //custom hook
    return useContext(AuthContext);
  };
  