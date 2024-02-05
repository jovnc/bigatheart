import { getUserDetails } from "@actions/authActions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { displayName, role, avatar } = await getUserDetails();
        setDisplayName(displayName);
        setRole(role);
        setAvatar(avatar);
      } catch (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { displayName, role, avatar, isLoading };
}
