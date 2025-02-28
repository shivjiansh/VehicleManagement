import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const IssueForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    vehicle: null,
    selectedComponents: [],
    labor_cost: "",
    isUrgent: false, // New checkbox state
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success | error
  const [issueId, setIssueId] = useState(null); // Store the issue ID for redirection
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/vehicles/")
      .then((res) => setVehicles(res.data));
    axios
      .get("http://localhost:8000/api/components/")
      .then((res) => setComponents(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        vehicle: formData.vehicle.id,
        components: formData.selectedComponents.map((c) => c.id),
        labor_cost: formData.labor_cost,
        use_new_components: formData.isUrgent,
      };

      const response = await axios.post(
        "http://localhost:8000/api/issues/",
        payload
      );
      const createdIssue = response.data;
      console.log(createdIssue);
      setIssueId(createdIssue.id);
      setSnackbarMessage(
        `Issue created! Total price: Rs${createdIssue.total_price}. Redirecting to payment page...`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate(`/payment/${createdIssue.id}`);
      }, 3000);
    } catch (error) {
      setSnackbarMessage("Error creating issue");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);

    
    if (issueId) {
      navigate(`/payment/${issueId}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 4, backgroundColor: "#f0f0f0" }}>
      <Typography variant="h6" gutterBottom>
        Create New Issue
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={vehicles}
              getOptionLabel={(option) =>
                `${option.make} ${option.model} (${option.year})`
              } 
              onChange={(e, value) =>
                setFormData({ ...formData, vehicle: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Vehicle"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={components}
              getOptionLabel={(option) => option.name} 
              onChange={(e, value) =>
                setFormData({ ...formData, selectedComponents: value })
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Components" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Labor Cost (Rs)"
              type="number"
              value={formData.labor_cost}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue >= 0 || newValue === "") {
                  setFormData({ ...formData, labor_cost: newValue });
                }
              }}
              required
            />
          </Grid>

          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isUrgent}
                  onChange={(e) =>
                    setFormData({ ...formData, isUrgent: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Use New Components"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#3c4957",
                "&:hover": {
                  backgroundColor: "#A31D1D",
                },
              }}
            >
              Create Issue
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar to show messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default IssueForm;
