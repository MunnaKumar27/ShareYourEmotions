// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>ShareYourEmotions</Link>
            <Link to="/create" style={styles.link}>Create New</Link>
            <Link to="/about" style={styles.link}>About</Link> {/* Add link to About */}
        </nav>
    );
};

// Styles for the Navbar and links
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#644d82',
    },
    link: {
        color: 'rgb(236, 91, 0)',
        textDecoration: 'none',
        padding: '10px',
        fontSize: '1rem',
        transition: 'blue 0.1s ease', // Smooth transition for color change
    },
    linkHover: {
        color: '#ffcc00', // Color change on hover
    }
};

export default Navbar;
