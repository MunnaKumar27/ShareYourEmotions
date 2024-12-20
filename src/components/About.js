// src/components/About.js
import React from "react";
import { FaInstagram, FaGithub, FaLink } from "react-icons/fa"; // Import social and portfolio icon

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About Me</h1>
            <div style={styles.contentWrapper}>
                {/* Left side - Images */}
                <div style={styles.imageSection}>
                    <img 
                        src="https://github.com/MunnaKumar27/MunnaPortfolio/blob/main/images/hero.jpg?raw=true" // Placeholder image link, replace with actual links
                        alt="profile"
                        style={styles.image}
                    />
                   
                </div>
                
                {/* Right side - Details */}
                <div style={styles.detailsSection}>
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
                        <a href="https://munna-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                            <FaLink size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Inline CSS styles for the About page
const styles = {
    container: {
        maxWidth: '1000px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: 'rgb(240, 103, 57)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color:'white',
    },
    header: {
        fontSize: '2.5rem',
        color: 'white',
        marginTop:'10px',
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '30px', // Space between the two sections
        marginTop:'10px',
    },
    imageSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    image: {
        width: '300px',
        height: 'auto',
        borderRadius: '8px',
        border:'2px solid rgb(19, 21, 19)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    detailsSection: {
        flex: 2,
        textAlign: 'left',
    },
    bio: {
        fontSize: '1.1rem',
        color: '#555',
        lineHeight: '1.6',
        marginBottom: '20px',
        color:'black',
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
