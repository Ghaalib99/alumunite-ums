import { Column, TableComponent } from "@/components/CustomTable";
import usersData from "../data/users.json";
import { User } from "@/types";
import {
  Handshake,
  Joystick,
  TrendingUp,
  UserIcon,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem("users", JSON.stringify(usersData));
      setUsers(usersData);
    }
  }, []);

  const handleRowClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const columns: Column<User>[] = [
    { header: "", accessor: "profilePhoto", isImage: true },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className=" ">
      <h3 className="font-bold mb-4">Welcome!</h3>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className="rounded-xl border border-gray-300 p-4 mb-4 md:mb-0">
          <div className="flex items-center mb-6">
            <div className="rounded-lg h-10 w-10 bg-secondary flex justify-center items-center mr-4">
              <UserIcon size={20} />
            </div>
            <div>
              <p>Users</p>
              <h4 className="font-bold">2,000</h4>
            </div>
          </div>
          <div className="flex items-center ">
            <TrendingUp className="text-green-500 mr-6" />
            <p>2,000 active users</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 p-4 mb-4 md:mb-0">
          <div className="flex items-center mb-6">
            <div className="rounded-lg h-10 w-10 bg-secondary flex justify-center items-center mr-4">
              <UsersRound size={20} />
            </div>
            <div>
              <p>New Users</p>
              <h3 className="font-bold">500</h3>
            </div>
          </div>
          <div className="flex items-center ">
            <TrendingUp className="text-green-500 mr-6" />
            <p>500 new users</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 p-4 mb-4 md:mb-0">
          <div className="flex items-center mb-6">
            <div className="rounded-lg h-10 w-10 bg-secondary flex justify-center items-center mr-4">
              <Joystick size={20} />
            </div>
            <div>
              <p>Solutions</p>
              <h4 className="font-bold">15,000</h4>
            </div>
          </div>
          <div className="flex items-center ">
            <TrendingUp className="text-green-500 mr-6" />
            <p>15,000+ solutions provided</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 p-4 mb-4 md:mb-0">
          <div className="flex items-center mb-6">
            <div className="rounded-lg h-10 w-10 bg-secondary flex justify-center items-center mr-4">
              <Handshake size={20} />
            </div>
            <div>
              <p>Engagement</p>
              <h4 className="font-bold">200,000</h4>
            </div>
          </div>
          <div className="flex items-center ">
            <TrendingUp className="text-green-500 mr-6" />
            <p>200,000 hrs+ user engagement</p>
          </div>
        </div>
      </div>

      <div className="w-full my-6">
        <TableComponent
          data={users}
          columns={columns}
          caption="List of users"
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Home;
