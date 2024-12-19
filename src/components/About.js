// src/components/About.js
import React from "react";
import { FaInstagram, FaGithub, FaLink } from "react-icons/fa"; // Import social and portfolio icon

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About Me</h1>
            <p style={styles.bio}>
                Currently, I'm a Software Engineer at TVS Motors Company, and I have completed my bachelor's from the National Institute of Technology Patna in Electronics and Communication Engineering. I'm an enthusiastic, curious, and applied learner with solid software engineering skills including C, C++, Data Structures and Algorithms, and SQL. 
                <br /><br />
                I have also explored the field of full-stack web development and have made several projects in it. My objective is to enhance my skills, knowledge, and attitude to contribute to the betterment of society. 
                <br /><br />
                Looking for full-time job opportunities. Reach out to me at: <a href="mailto:mkumar270278@gmail.com">mkumar270270278@gmail.com</a>
            </p>
            <div style={styles.socialIcons}>
                <a href="https://www.instagram.com/Munnakumar__27" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                    <FaInstagram size={30} />
                </a>
                <a href="https://github.com/munnakumar27" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                    <FaGithub size={30} />
                </a>
                <a href="https://munna-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" style={styles.icon}>  {/* Replace with your actual portfolio link */}
                    <FaLink size={30} />
                </a>
            </div>
        </div>
    );
};

// Inline CSS styles for the About page
const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    header: {
        fontSize: '2.5rem',
        color: '#333',
    },
    bio: {
        fontSize: '1.1rem',
        color: '#555',
        lineHeight: '1.6',
        textAlign: 'left',
        marginBottom: '20px',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    icon: {
        color: '#333',
        textDecoration: 'none',
    },
};

export default About;
