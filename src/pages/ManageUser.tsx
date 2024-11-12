import { useState, useEffect } from "react";
import { User } from "@/types";

import { Column, TableComponent } from "@/components/CustomTable";
import { useNavigate } from "react-router-dom";
import { ToastComponent } from "@/components/Toast";

const ManageUser = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Columns configuration for the table
  const columns: Column<User>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
    { header: "Profile Photo", accessor: "profilePhoto", isImage: true },
    { header: "Actions", accessor: "actions", isAction: true },
  ];

  return (
    <div>
      <ToastComponent
        title=""
        description="You deleted successfully"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <h3 className="font-bold mb-4">Manage Users</h3>
      <div className="w-full my-6">
        <TableComponent
          key={users.length}
          data={users}
          columns={columns}
          caption="List of Users"
        />
      </div>
    </div>
  );
};

export default ManageUser;
