import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewUser,
  deleteUser,
  getUser,
  updateUser,
} from "../../store/reducers/userReducer";
import { User } from "../../interface";

export default function Admin() {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users: User[] = useSelector((state: any) => state.user.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const addUser = () => {
    const newUser = {
      name: "Mỹ Tâm",
    };
    dispatch(addNewUser(newUser));
  };

  const handleEditUser = (id: number) => {
    const userEdit = users.find((item: User) => item.id === id);
    if (userEdit) {
      setSelectedUserId(id);
      setInputValue(userEdit.name);
    }
  };

  const handleUpdate = () => {
    if (selectedUserId !== null) {
      dispatch(updateUser({ id: selectedUserId, name: inputValue }));
      setSelectedUserId(null);
      setInputValue("");
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h3>Cập nhật user</h3>
      <input type="text" onChange={handleChangeValue} value={inputValue} />
      <button onClick={handleUpdate} disabled={selectedUserId === null}>
        Cập nhật
      </button>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleEditUser(user.id)}>Sửa</button>
            <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <button onClick={addUser}>Thêm user</button>
    </div>
  );
}
