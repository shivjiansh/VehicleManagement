import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  
} from "@mui/material";

const VehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    VIN: "",
    make: "",
    model: "",
    year: "",
    issue_description: "",
  });

  const [vehicles, setVehicles] = useState([]); // State to store the list of vehicles

  // Fetch vehicles when the page loads
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vehicles/");
        setVehicles(response.data); // Set the fetched vehicles to the state
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // Handle form submission to add a new vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/vehicles/",
        vehicleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Vehicle registered successfully!");

      // After adding the new vehicle, update the list without a page refresh
      setVehicles([...vehicles, response.data]);

      // Clear the form fields
      setVehicleData({
        VIN: "",
        make: "",
        model: "",
        year: "",
        issue_description: "",
      });
    } catch (error) {
      console.error("Error details:", error.response);
      alert(
        `Error registering vehicle: ${error.response?.data || error.message}`
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 4, backgroundColor: "#f0f0f0" }}>
      <Typography variant="h6" gutterBottom>
        Register New Vehicle
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="VIN"
              value={vehicleData.VIN}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, VIN: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Make"
              value={vehicleData.make}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, make: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              value={vehicleData.model}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, model: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year"
              type="number"
              value={vehicleData.year}
              onChange={(e) =>
                setVehicleData({ ...vehicleData, year: e.target.value })
              }
              required
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Issue Description"
              value={vehicleData.issue_description}
              onChange={(e) =>
                setVehicleData({
                  ...vehicleData,
                  issue_description: e.target.value,
                })
              }
              required
              multiline
              rows={4}
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
              Register Vehicle
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display the list of existing vehicles */}
    </Paper>
  );
};

export default VehicleForm;
