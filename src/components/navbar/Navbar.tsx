import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useUserName } from "./hook";

export default function NavBar() {
  const { userName } = useUserName();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Swift
            </Link>
          </Typography>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <Typography variant="h6">{userName}</Typography>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
