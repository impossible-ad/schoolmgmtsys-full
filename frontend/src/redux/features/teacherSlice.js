import { indexSlice } from "./indexSlice";

export const teacherAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get all teachers;
    // query for get uses providesTags;
    // mutation for postMessage,delete,update uses invalidateTags;

    getAllTeachers: builder.query({
      query: ({ page, limit }) => ({
        url: `/teacher/get_teacher?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),

    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/teacher/add_teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),

    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete_teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),

    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/update_teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherAPIs;
