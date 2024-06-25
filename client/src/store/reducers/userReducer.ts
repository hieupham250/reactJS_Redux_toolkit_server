import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import axios from "axios";

const users: User[] = [];

export const getUser: any = createAsyncThunk("users/getAllUser", async () => {
  const response = await axios.get("http://localhost:8080/users");
  return response.data;
});

//hàm thêm mới user
export const addNewUser: any = createAsyncThunk(
  "users/addUser",
  async (user) => {
    const response = await axios.post("http://localhost:8080/users", user);
    return response.data;
  }
);

//hàm xóa user
export const deleteUser: any = createAsyncThunk("users/deleteUser", (id) => {
  axios.delete(`http://localhost:8080/users/${id}`);
  return id;
});

//hàm sửa user
export const updateUser: any = createAsyncThunk(
  "users/updateUser",
  async ({ id, name }: { id: number; name: string }) => {
    const response = await axios.patch(`http://localhost:8080/users/${id}`, {
      name,
    });
    return response.data;
  }
);

const reducerUsers = createSlice({
  name: "reducerUsers",
  initialState: {
    users: users,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: any, action: any) => {
        // trạng thái chờ lấy dữ liệu
      })
      .addCase(getUser.fulfilled, (state: any, action: any) => {
        // trạng thái lấy dữ liệu thành công
        state.users = action.payload;
      })
      .addCase(getUser.rejected, () => {
        // trạng thái lấy dữ liệu thất bại
      })
      .addCase(addNewUser.fulfilled, (state: any, action: any) => {
        console.log(state.users);
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default reducerUsers.reducer;
