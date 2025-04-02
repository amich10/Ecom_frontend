import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import authSvc from "../../../services/auth.service";
import {
  InputLabel,
  PasswordInputComponentController,
  SubmitButton,
} from "../../../components/form/input.component";
import {
  NotificationType,
  notifyUserRegistration,
} from "../../../utilities/helpers";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const ResetPasswordPage = () => {





  const params = useParams(); //gives params


  // Define validation schema
const resetPasswordSchema = yup.object({
    token: yup.string().required(),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });
  const [_token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const submitEvent = async (data: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => {
    // console.log(data) //gives password,confirmpassword and veriftToken
    try {
      await authSvc.patchRequest("/auth/password-reset", data);
      notifyUserRegistration(
        "Your password has been changed successfully. Please login to continue",
        NotificationType.SUCCESS
      );
      navigate('/')
    } catch (exception) {
      console.log(exception);
      notifyUserRegistration(
        "Your password cannot be changed at this time.Try again later",
        NotificationType.ERROR
      );
      navigate("/forget-password");
    }
  };

  const verifyToken = async () => {
    try {
      const forgetPasswordToken = params.forgetToken; //forgetToekn from (/'verify-forget-token/:forgetToken')
      const { result }: any = await authSvc.getRequest(
        "/auth/verify-token/" + forgetPasswordToken
      );
      setToken(result.data.verifyToken); //from postman {data:{verifyToken:'adavqrvaavwqvafvwva'}}
      setValue("token", result.data.verifyToken);
    } catch (exception) {
      console.log(exception);
      notifyUserRegistration(
        "Sorry, token cannot be verified.Please try again later",
        NotificationType.ERROR
      );
      navigate("/forget-password");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-120 rounded-md border-2 border-violet-700 shadow-2xl shadow-violet-600 p-3 font-serif">
          <h1 className="text-center text-xl font-semibold text-violet-600 ">
            Reset your Password
          </h1>
          <form onSubmit={handleSubmit(submitEvent)}>
            <div className="mt-3">
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordInputComponentController
                id="password"
                type="password"
                control={control}
                errorMsg={errors?.password?.message}
              />
            </div>
            <div className="mt-3">
              <InputLabel htmlFor="confirmPassword">Confrm Password</InputLabel>
              <PasswordInputComponentController
                id="confirmPassword"
                type="password"
                control={control}
                errorMsg={errors?.confirmPassword?.message}
              />
            </div>
            <div className="mt-3">
              <SubmitButton isSubmitting={isSubmitting}>
                {" "}
                Change Password
              </SubmitButton>
            </div>
          </form>
          <div className=" mt-3 flex flex-col items-center justify-center">
            <div>
              Already have an Account?{" "}
              <NavLink to="/" className="underline text-violet-600">
                Login Here
              </NavLink>
            </div>
            <div>
              Want to create a new Account?{" "}
              <NavLink to="/register" className="underline text-violet-600">
                Register Here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
