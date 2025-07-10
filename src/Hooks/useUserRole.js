import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = (email) => {
  const axios = useAxiosSecure();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["user-role", email?.toLowerCase()],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/users/role/${email.toLowerCase()}`);
      return res.data.role?.toLowerCase();
    },
  });

  return { role: roleData, isLoading };
};

export default useUserRole;
