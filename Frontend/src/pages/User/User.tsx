import Login from "pages/Login";
import { useState } from "react";
import Register from "pages/Register";
import { Grid, MenuItem, Select } from "@mui/material";
import Recovery from "pages/Recovery";
import { useAppSelector } from "redux/hooks";
import Button from "components/atoms/Button";
import AuthService from "services/auth.service";

export default function User() {
  const [type, setType] = useState("login");
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <h2 className="heading">User</h2>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          {!user ? (
            <Select
              variant="filled"
              id="selectFormType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{
                "& :after, :before": {
                  display: "none",
                },
                color: "#ffffff",
                border: "1px solid #ffffff",
                background: "transparent !important",
                lineHeight: "0.5em",
                borderRadius: 0,
                textAlign: "center",
                width: "100%",
                marginBottom: "16px",
                "& .MuiSelect-select": {
                  height: "1em !important",
                  minHeight: "1em !important",
                  paddingTop: "20px",
                },
                "& :hover, .Mui-focused": {
                  background: "transparent",
                },
                "& svg": {
                  fill: "#ffffff",
                },
              }}
            >
              <MenuItem disableRipple value={"login"}>
                Login
              </MenuItem>
              <MenuItem disableRipple value={"register"}>
                Register
              </MenuItem>
              <MenuItem disableRipple value={"recovery"}>
                Recovery
              </MenuItem>
            </Select>
          ) : (
            <Button
              variant="outlined"
              onClick={() => AuthService.logout()}
              style={{ marginBottom: "16px", borderRadius: 0 }}
            >
              Logout
            </Button>
          )}
          <div className="form">
            {!user ? (
              type === "login" ? (
                <Login />
              ) : type === "recovery" ? (
                <Recovery />
              ) : (
                <Register />
              )
            ) : (
              <Register />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
