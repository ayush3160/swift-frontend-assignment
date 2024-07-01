import {
  Avatar,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useProfileDetails } from "./hook";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useProfileDetails();

  return (
    <Box mx={"15%"} marginTop={"5%"}>
      <Typography variant="h5" component="div">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        Welcome , {user?.name}
      </Typography>
      <Box border={1} borderRadius={2} borderColor="grey.400" p={2}>
        <Box display={"flex"}>
          <Avatar
            sx={{ bgcolor: "primary.main", width: 100, height: 100, mr: 2 }}
          >
            AB
          </Avatar>
          <Box>
            <Typography variant="h6" my={2}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={4} my={2}>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              User Id
            </Typography>
            <TextField fullWidth variant="outlined" value={user?.id} disabled />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={user?.name}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Email Id
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={user?.email}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Address
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={`${user?.address.street}, ${user?.address.city}`}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Phone
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={user?.phone}
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
