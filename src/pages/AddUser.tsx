import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ToastComponent } from "@/components/Toast";

// export function getInitials(name: string) {
//   const names = name.split(" ");
//   const initials = names.map((name) => name.charAt(0).toUpperCase());
//   return initials.join("");
// }

// Form validation schema

const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  active: yup.boolean(),
  profilePhoto: yup
    .mixed()
    .test(
      "required",
      "Profile photo is required",
      (value) => value instanceof File
    ),
});

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    const newUser = { id: Date.now(), ...data };
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    handleAction();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAction = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <ToastComponent
        title="User Added"
        description="You have successfully added a new user"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <h3 className="font-bold mb-4">Add User</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-[60%]  border border-gray-300 rounded-xl p-6 mt-6"
      >
        <div className="md:flex  gap-4">
          <div className="w-full md:w-1/2 mb-4">
            <label className="font-bold mb-2">Fullname</label>
            <Input
              type="text"
              placeholder="Enter fullname"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <label className="font-bold mb-2">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="md:flex gap-4">
          <div className="w-full md:w-1/2 mb-4">
            <label className="font-bold mb-2">Role</label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 mb-4">
            <label className="font-bold mb-2">Profile Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                register("profilePhoto").onChange(e);
                handlePhotoUpload(e);
              }}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="mt-2 w-16 h-16 rounded-full"
              />
            )}
            {errors.profilePhoto && (
              <p className="text-red-500">{errors.profilePhoto.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <label className="font-bold">Active</label>
          <Controller
            control={control}
            name="active"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full text-white mb-2 mt-6 hover:bg-secondary-foreground"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
