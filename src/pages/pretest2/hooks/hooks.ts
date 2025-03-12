import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import defaultUserData from "../../../assets/pretest2-user.json";
import { UserData } from "../types/Types";
const apiUrl = "https://my.api.mockaroo.com/pretest2_user.json?key=c109b2f0";

function useUserData() {
  const fetchUserData = async () => {
    let data = defaultUserData;
    try {
      const response = await axios.get<UserData>(apiUrl);
      data = response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    return data;
  };
  const { isSuccess, data } = useQuery({
    queryKey: ["p2 user data"],
    queryFn: fetchUserData,
  });
  return { isSuccess, data };
}

export { useUserData };
