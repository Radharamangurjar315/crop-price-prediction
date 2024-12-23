import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const CropPredictionForm = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setPrediction(null); // Reset prediction
    setLoading(true); // Show loading state

    try {
      // Make POST request to the Flask API
      const response = await axios.post("http://127.0.0.1:8080/croppredict", formData);
      setPrediction(response.data.recommended_crop); // Display prediction result
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to fetch prediction. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3}>
        {/* Header */}
        <Box sx={{ bgcolor: "#F5DEB3", p: 3, borderRadius: "4px 4px 0 0" }}>
          <Typography variant="h4" component="h1" align="center" sx={{ color: "#333" }}>
            Crop Recommendation
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Box sx={{ display: "grid", gap: 3 }}>
            {/* Input Fields */}
            {[
              { name: "N", label: "Nitrogen (N)" },
              { name: "P", label: "Phosphorous (P)" },
              { name: "K", label: "Potassium (K)" },
              { name: "temperature", label: "Temperature (°C)" },
              { name: "humidity", label: "Humidity (%)" },
              { name: "ph", label: "pH Level" },
              { name: "rainfall", label: "Rainfall (mm)" }
            ].map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type="number"
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required
              />
            ))}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Predict Crop"}
            </Button>
          </Box>
        </Box>

        {/* Result Section */}
        <Box sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {prediction && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Recommended Crop: <strong>{prediction}</strong>
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CropPredictionForm;
