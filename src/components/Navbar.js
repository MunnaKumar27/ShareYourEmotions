// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/create" style={styles.link}>Create Post</Link>
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
        backgroundColor: '#333',
        color: '#fff',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        padding: '10px',
        fontSize: '1rem',
    }
};

export default Navbar;
