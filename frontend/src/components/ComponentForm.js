import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ComponentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    repair_price: '',
    purchase_price: '',
    stock: ''
  });

  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/components/');
        setComponents(response.data);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchComponents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/components/', formData);
      alert('Component registered successfully!');
      setComponents([...components, response.data]);
      setFormData({ name: '', repair_price: '', purchase_price: '', stock: '' });
    } catch (error) {
      alert('Error registering component');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 4, backgroundColor: "#f0f0f0" }}>
      <Typography variant="h6" gutterBottom>
        Register New Component
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Component Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Repair Price (Rs)"
              type="number"
              value={formData.repair_price}
              onChange={(e) => {
                const newValue = e.target.value;
                // If Repair Price is edited, set Purchase Price to 0
                setFormData({
                  ...formData,
                  repair_price: newValue,
                                });
              }}
              required
              inputProps={{ min: "0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Purchase Price (Rs)"
              type="number"
              value={formData.purchase_price}
              onChange={(e) => {
                const newValue = e.target.value;
                // If Purchase Price is edited, set Repair Price to 0
                setFormData({
                  ...formData,
                  purchase_price: newValue,
                 
                });
              }}
              required
              inputProps={{ min: "0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock Quantity"
              type="number"
              value={formData.stock}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue > 0 || newValue === "") {
                  setFormData({ ...formData, stock: newValue });
                }
              }}
              required
              inputProps={{ min: "1" }}
            />
          </Grid>
          <Grid item xs={12}>
            <br></br>
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
              Register Component
            </Button>
          </Grid>
        </Grid>
      </form>

      
    </Paper>
  );
};

export default ComponentForm;