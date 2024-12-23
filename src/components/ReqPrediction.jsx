// import { useState } from "react";
// import "./PredictionPage.css";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
// } from "@mui/material";

// const CropPredictionForm = () => {
//   const [formData, setFormData] = useState({
//     cropType: "",
//     landArea: "",
//     soilType: "",
//     season: "",
//   });

//   const commodities = [
//     "Wheat",
//     "Gram",
//     "Moong",
//     "Soyabean",
//     "Rice",
//     "Maize",
//     "Sugarcane",
//     "Bajra",
//     "Toor(Arhar)",
//     "Urad",
//     "Cotton",
//     "Groundnut",
//     "Onion",
//     "Potato",
//     "Tomato",
//   ];

//   const soilTypes = [
//     "Sandy",
//     "Loamy",
//     "Clay",
//     "Silty",
//     "Peaty",
//     "Chalky",
//     "Saline",
//   ];

//   const seasons = ["Kharif", "Rabi", "Zaid", "Summer", "Winter"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Crop Form submitted:", formData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Paper elevation={3}>
//         <Box
//           sx={{
//             bgcolor: "success.main",
//             color: "primary.contrastText",
//             p: 3,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h4" component="h1" style={{color: "white", fontFamily: "cursive"}}>
//             Crop Requirement Prediction
//           </Typography>
//         </Box>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//             {/* Crop Type Selection */}
//             <FormControl fullWidth>
//               <InputLabel>Select Crop Type</InputLabel>
//               <Select
//                 name="cropType"
//                 value={formData.cropType}
//                 label="Select Crop Type"
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select a crop type</MenuItem>
//                 {commodities.map((commodity) => (
//                   <MenuItem
//                     key={commodity.toLowerCase()}
//                     value={commodity.toLowerCase()}
//                   >
//                     {commodity}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Land Area */}
//             <TextField
//               fullWidth
//               type="number"
//               name="landArea"
//               label="Enter Land Area (in Acres)"
//               value={formData.landArea}
//               onChange={handleChange}
//               required
//             />

//             {/* Soil Type Selection */}
//             <FormControl fullWidth>
//               <InputLabel>Select Soil Type</InputLabel>
//               <Select
//                 name="soilType"
//                 value={formData.soilType}
//                 label="Select Soil Type"
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select soil type</MenuItem>
//                 {soilTypes.map((soil) => (
//                   <MenuItem key={soil.toLowerCase()} value={soil.toLowerCase()}>
//                     {soil}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Season Selection */}
//             <FormControl fullWidth>
//               <InputLabel>Select Season</InputLabel>
//               <Select
//                 name="season"
//                 value={formData.season}
//                 label="Select Season"
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select a season</MenuItem>
//                 {seasons.map((season) => (
//                   <MenuItem
//                     key={season.toLowerCase()}
//                     value={season.toLowerCase()}
//                   >
//                     {season}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ mt: 2 }}
//             >
//               Predict Crop Yield
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default CropPredictionForm;
