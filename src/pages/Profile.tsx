import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomAvatar } from "@/components/CustomAvatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { ToastComponent } from "@/components/Toast";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const foundUser = users.find((user: User) => user.id === Number(id));
        setUser(foundUser || null);
      }
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    if (user) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = storedUsers.map((u: User) =>
        u.id === user.id
          ? { ...user, profilePhoto: selectedImage || user.profilePhoto }
          : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    setIsEditable(false);
    handleAction();
  };

  if (!user) return <div>Loading...</div>;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <ToastComponent
        title="Changes Saved"
        description="You have successfully edited user"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="mb-4 flex items-center">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="ml-4">User Profile</h3>
      </div>
      <form className="w-full lg:w-[60%] border border-gray-300 rounded-xl p-6 mt-6">
        <div className="md:flex items-center mb-6">
          <CustomAvatar
            src={selectedImage || user.profilePhoto || ""}
            alt="profile photo"
            fallback="jhj"
            size="h-28 w-28"
          />

          <div className="md:ml-4 mt-4 md:mt-0">
            <label className="text-primary underline cursor-pointer">
              Change Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={!isEditable}
              />
            </label>
          </div>
        </div>

        <div className="md:flex gap-4">
          <div className="md:w-1/2 mb-4">
            <label>Name:</label>
            <Input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              disabled={!isEditable}
            />
          </div>
          <div className="md:w-1/2 mb-4">
            <label>Email:</label>
            <Input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={!isEditable}
            />
          </div>
        </div>

        <div className="md:flex gap-4">
          <div className="md:w-1/2 mb-4">
            <label>Role:</label>
            <Select
              value={user.role}
              onValueChange={(value) => setUser({ ...user, role: value })}
              disabled={!isEditable}
            >
              <SelectTrigger className="w-full p-2 border rounded">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:w-1/2 mb-4">
            <label>Status:</label>
            <Select
              value={user.status}
              onValueChange={(value) => setUser({ ...user, status: value })}
              disabled={!isEditable}
            >
              <SelectTrigger className="w-full p-2 border rounded">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            className="w-full md:w-1/2  text-white hover:bg-secondary-foreground md:mr-6"
            onClick={handleEditClick}
            disabled={isEditable}
          >
            Edit
          </Button>
          {isEditable && (
            <Button
              type="button"
              className="w-full md:w-1/2 text-white  hover:bg-secondary-foreground"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
