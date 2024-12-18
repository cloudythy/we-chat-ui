import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import {Search, User, Users} from "lucide-react";
import {AddFriendModal} from "./AddFriendModal.jsx";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="p-5 pb-1">
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="flex-1 flex items-center bg-base-200 p-2 rounded-lg">
              <Search className="text-primary"/>
              <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full pl-2"
              />
            </div>

            {/* Buttons */}
            <button
                className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center hover:bg-base-300 transition"
            >
              <User className="text-primary w-5 h-5"/>
            </button>
            <button
                className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center hover:bg-base-300 transition"
            >
              <Users className="text-primary w-5 h-5"/>
            </button>
          </div>
        </div>

        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6"/>
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>

          {/* Online filter toggle */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-2 px-5 flex gap-4 border-b border-base-300">
          <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 font-medium ${activeTab === "all" ? "border-b-2 border-primary" : ""}`}
          >
            All
          </button>
          <button
              onClick={() => setActiveTab("waiting")}
              className={`pb-2 font-medium ${
                  activeTab === "waiting" ? "border-b-2 border-primary" : ""
              }`}
          >
            Waiting
          </button>
          <AddFriendModal/>
        </div>

        {/* User List */}
        <div className="overflow-y-auto w-full py-3">
          {users.map((user) => (
              <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.name}
                      className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                      <span
                          className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-zinc-900"
                      />
                  )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
          ))}

          {users.length === 0 && (
              <div className="text-center text-zinc-500 py-4">No users to display</div>
          )}
        </div>
      </aside>
  );
};

export default Sidebar;
