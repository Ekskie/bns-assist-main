"use client";
import { useSelector } from "react-redux";
import { selectToken } from "@/service/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decode = jwtDecode(token);
    /* 
    console.log(decode); */

    const { name, id, type, email, barangay, imgUrl, user_type } =
      decode.UserInfo;

    return {
      name,
      id,
      type,
      email,
      barangay,
      imgUrl,
      user_type: user_type ? user_type : "",
    };
  }

  return {
    name: "",
    id: "",
    type: "",
    email: "",
    barangay: "",
    imgUrl: "",
    user_type: "",
  };
};

export default useAuth;
