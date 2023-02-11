import AdminImg from "assets/Admin.jpg";
import TigerImg from "assets/Tiger.png";
import { useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import UsersService from "services/users.service";

export default function Members() {
  const users = useAppSelector((state) => state.user.users);
  useEffect(() => {
    UsersService.getUsers();
  }, []);

  return (
    <div>
      <ul className="members-list">
        {users.map((user: any, index: number) => (
          <li
            className={user?.role === "admin" ? "admin-member" : ""}
            key={index}
          >
            <img
              src={user?.role === "admin" ? AdminImg : TigerImg}
              alt="User"
            />
            <span
              style={{
                position: "absolute",
                right: "4px",
                top: "4px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {user.race}
            </span>
            <p style={{ textTransform: "capitalize" }}>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
