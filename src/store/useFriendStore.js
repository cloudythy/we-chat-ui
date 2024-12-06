import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useFriendStore = create((set, get) => ({
  request: [],
  sentRequest: null,
  selectedUser: null,
  isAddFriendLoading: false,

  addFriend: async () => {
    set({ isAddFriendLoading: true });
    try {
      const res = await axiosInstance.post("/api/v1/friend",{
        toUserId: get().selectedUser._id
      });
      set({ sentRequest: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddFriendLoading: false });
    }
  },

  findFriend: async () => {
    set({ isAddFriendLoading: true });
    try {
      const res = await axiosInstance.get("/api/v1/friend-request");
      set({ request: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddFriendLoading: false });
    }
  },
}));
