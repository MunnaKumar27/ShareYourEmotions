import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>ShareYourEmotions</Link>
            <Link to="/create" style={styles.new}>Create New</Link>  {/* Applied new styles here */}
            <Link to="/about" style={styles.link}>About</Link>
        </nav>
    );
};

// Styles for the Navbar and links
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: 'rgb(244, 72, 15)',
        flexWrap: 'wrap',  // Allow the items to wrap on small screens
        border:'1px solid rgb(0, 0, 0)',
    },
    link: {
        // border:'1px solid rgb(0, 0, 0)',
        borderRadius:'5px',
        // backgroundColor: 'rgb(178, 255, 166)',
        color: 'rgb(0, 0, 0)',
        textDecoration: 'none',
        padding: '10px',
        fontSize: '1.3rem',
        fontWeight: '800',
        fontFamily: 'Georgia, serif',
        transition: 'color 0.1s ease', // Smooth transition for color change
    },
    new: {
        padding: '10px 20px',
        margin:'auto 0',
        backgroundColor: 'rgb(20, 144, 4)',
        color: 'black',
        border: 'none',
        borderRadius: '10px',
        border:'2px solid white',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
        fontFamily: 'Georgia, serif',
        fontWeight: '800',
        textDecoration: 'none',  // Ensure no underline in the button
        display: 'inline-block',  // To make it behave like a button
        animation: 'shake 0.5s ease-in-out infinite',
    },
    // Responsive styles for small screens (max-width: 768px)
    '@media (max-width: 768px)': {
        navbar: {
            flexDirection: 'column',  // Stack links vertically on small screens
            alignItems: 'center',     // Center the links
            padding: '15px',
        },
        link: {
            fontSize: '1.1rem',       // Adjust font size for smaller screens
            marginBottom: '10px',     // Add space between links
        },
        new: {
            fontSize: '1rem',          // Adjust font size for small screens
            padding: '12px 25px',      // Adjust padding for better touch targets
            marginBottom: '10px',      // Space between button and other links
        }
    }
};

export default Navbar;
