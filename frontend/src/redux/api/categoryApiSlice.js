import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
      // Invalidate the category list to refetch it
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      // Invalidate the category list to refetch it
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      // Invalidate the category list to refetch it
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
      // Provide a tag for the category list
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
