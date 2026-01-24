"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";

const navItems = [
  { label: "Blogs", href: "/blogs", icon: ArticleIcon },
  { label: "FAQ", href: "/faq", icon: HelpOutlineIcon }, // ✅ ADDED
  { label: "Profile", href: "/profile", icon: PersonIcon },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          mb: 2,
          "&:hover": {
            backgroundColor: "rgba(33, 150, 243, 0.1)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <List>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.08)",
                  },
                }}
              >
                <IconComponent
                  sx={{
                    mr: 1.5,
                    color: "#2196F3",
                    fontSize: 20,
                  }}
                />
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 0, sm: 2 },
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: "1.4rem",
                background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
                letterSpacing: "-0.5px",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              Research Discuss
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "#333",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 2,
                      py: 1,
                      borderRadius: 1.5,
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background:
                          "linear-gradient(90deg, #2196F3 0%, #1976D2 100%)",
                        transform: "scaleX(0)",
                        transition: "transform 0.3s ease",
                        transformOrigin: "right",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.08)",
                        color: "#2196F3",
                        "&::after": {
                          transform: "scaleX(1)",
                          transformOrigin: "left",
                        },
                      },
                    }}
                  >
                    <IconComponent sx={{ fontSize: "1.2rem" }} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "block", md: "none" },
              color: "#2196F3",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#FAFAFA",
            borderBottom: "1px solid #E0E0E0",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
