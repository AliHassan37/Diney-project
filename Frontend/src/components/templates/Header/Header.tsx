import "./Header.css";
import { Grid } from "@mui/material";
import { useAppDispatch } from "redux/hooks";
import { tabActions } from "redux/slices/tab";

export default function Header() {
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className="navbar">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
            <ul>
              <li onClick={() => dispatch(tabActions.setTab("gifs"))}>Gifs</li>
              <li onClick={() => dispatch(tabActions.setTab("pictures"))}>
                Pictures
              </li>
              <li onClick={() => dispatch(tabActions.setTab("videos"))}>
                Videos
              </li>
              <li onClick={() => dispatch(tabActions.setTab("music"))}>
                Music
              </li>
              <li onClick={() => dispatch(tabActions.setTab("user"))}>User</li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}
