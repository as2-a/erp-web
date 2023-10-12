import './App.css'
import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Navbar';
import Footer from './components/Footer';
import Principal from './components/Principal';
import React from 'react';
import { SignIn } from './components/SignIn';
import AuthService from './services/Auth.service';

function App() {
  const signedIn = AuthService.isAuthenticated();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: prefersDarkMode ? "#121212" : "#ebebeb", //NAVBAR
                boxShadow: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {},
              contained: {
                boxShadow: "none",
                backgroundColor: "#3e5cb2",
                border: "1px solid #3e5cb2",
                color: "white",
                "&:hover": {
                  backgroundColor: prefersDarkMode ? "#1e1e1e" : "#fff",
                  color: prefersDarkMode ? "white" : "#3e5cb2",
                  border: "1px solid #3e5cb2",
                  boxShadow: "none",
                },
              },
              text: {
                "&:hover": {
                  backgroundColor: "none",
                },
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          {signedIn ? (<Box>
            <Header />
            <Box sx={{ minHeight: '90vh' }}>
              <Routes>
                <Route
                  path={`/`}
                  element={<Principal />}
                />
              </Routes>
            </Box>
            <Footer />
          </Box>) : (<SignIn />)
          }
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App
