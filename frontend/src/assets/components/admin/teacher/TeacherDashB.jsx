import { toast } from "react-toastify";
import {
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useGetAllTeachersQuery,
  useUpdateTeacherMutation,
} from "../../../../redux/features/teacherSlice";
import Loading from "../../shared/Loading";
import { useState } from "react";
import Pagination from "../../shared/pagination";
import { useSelector } from "react-redux";

const initialData = {
  name: "",
  email: "",
  position: "",
  phone: "",
  image: "",
};

const TeacherDashB = () => {
  const { role } = useSelector((state) => state.user);
  const [originalData, setOriginalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState();
  // const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllTeachersQuery({
    page,
    limit: 5,
  });
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [addTeacher] = useAddTeacherMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const totalPages = data?.totalPages;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev, //spread operator
      image: e.target.files[0],
    }));
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error)
    return <p className="p-4 text-red-600">Failed to load teachers!</p>;

  const teachers = data?.teacher || [];

  const handleDelete = async (teacher) => {
    setTeacherId(teacher.id);
    try {
      await deleteTeacher(teacher.id).unwrap();
      toast.success(`${teacher.name} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${teacher.name}`);
    }
  };

  const handleEdit = async (teacher) => {
    setIsAdding(false);
    setIsModalOpen(true);
    setTeacherId(teacher.id);
    setOriginalData(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
      image: teacher.img,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdding) {
      const multerData = new FormData();
      multerData.append("name", formData.name);
      multerData.append("email", formData.email);
      multerData.append("position", formData.position);
      multerData.append("phone", formData.phone);
      multerData.append("image", formData.image);
      try {
        const res = await addTeacher(multerData).unwrap();
        toast.success(res.message || "Teacher added successfully");
        setFormData(initialData);
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error.data?.message || "failed to add Teacher");
      }
      return;
    }

    const updatedData = new FormData();
    if (formData.name !== originalData.name) {
      updatedData.append("name", formData.name);
    }
    if (formData.email !== originalData.email) {
      updatedData.append("email", formData.email);
    }
    if (formData.phone !== originalData.phone) {
      updatedData.append("phone", formData.phone);
    }
    if (formData.position !== originalData.position) {
      updatedData.append("position", formData.position);
    }
    if (formData.image) {
      updatedData.append("image", formData.image);
    }
    if (updatedData.length === 0) {
      toast.info("No changes made.");
      return;
    }

    try {
      const res = await updateTeacher({
        id: teacherId,
        data: updatedData,
      }).unwrap();
      await updateTeacher({ id: teacherId, data: updatedData }).unwrap();
      toast.success(
        res.message || `${formData.name} 's data updated successfully`
      );
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Update Failed!");
    }
  };

  const handleAddTeacher = () => {
    setIsModalOpen(true);
    setIsAdding(true);
    setTeacherId(null);
    setOriginalData({});
    setFormData(initialData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Teachers List</h1>
        <button
          onClick={handleAddTeacher}
          className="cursor-pointer bg-blue-600 text-white px-3 rounded-full"
        >
          Add Teacher
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${teacher.img}`}
                    alt={teacher.img ? teacher.name : "No Image"}
                    className="w-12 h-12 object-cover"
                  />{" "}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {role == "admin" && (
                    <div className="space-x-4">
                      <button
                        onClick={() => handleDelete(teacher)}
                        className="cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No teacher data found</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "ADD" : "EDIT"} Teacher
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                value={formData.name || ""}
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="email"
                id="email"
                value={formData.email || ""}
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="text"
                id="position"
                value={formData.position || ""}
                placeholder="Position"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="text"
                id="phone"
                value={formData.phone || ""}
                placeholder="Phone"
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
              />

              {!isAdding && formData.image ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${formData.image}`}
                  alt={formData.name}
                  className=" object-cover rounded"
                />
              ) : null}

              <input
                type="file"
                id="image"
                //value={formData.image}
                onChange={handleFileChange}
                className="mb-4 border w-full px-2 py-3 rounded-sm"
                required={isAdding}
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isAdding ? "ADD" : "EDIT"} Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashB;
