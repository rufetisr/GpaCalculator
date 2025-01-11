import React from 'react';
import './Privacy.css'

const Privacy = () => {
    return (
        <div className='privacy' >
            <h4>Privacy Policy</h4>
            {/* <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p> */}
            <p><strong>Last Updated:</strong> {"January 11, 2025"}</p>
            <p>This Privacy Policy explains how the GPA Calculator ("we," "our," or "us") collects, uses, and protects your information when you use our service. By using the extension, you agree to the terms outlined below.</p>
            <h5>1. Information We Collect</h5>
            <p>We collect and store the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> Email address, username, and hashed passwords (for account creation and management).</li>
                <li><strong>Academic Data:</strong> Points, credits, and subject information entered into the calculator.</li>
                <li><strong>Local Storage Data:</strong> A token (for authentication purposes) is stored in your browser's localStorage. This token is used to maintain your login session and does not contain any personally identifiable information.</li>
            </ul>

            <h5>2. How We Use Your Information</h5>
            <p>We use the information collected for the following purposes:</p>
            <ul>
                <li>To provide and improve the GPA calculation functionality.</li>
                <li>To allow users to save, access, and manage their grades.</li>
                <li>To authenticate and secure user accounts by storing the authentication token in localStorage to maintain your login session.</li>
                <li>To ensure compliance with applicable laws and regulations.</li>
            </ul>

            <h5>3. Data Storage and Security</h5>
            <p>
                All data is securely stored in a MongoDB database. Passwords are hashed using industry-standard encryption algorithms before storage.
            </p>
            <p>
                A token is stored in localStorage on your browser for authentication purposes. This token is not shared with external services and is only used for session management.
            </p>
            <p>We use secure connections (HTTPS) to transmit data between your browser and our servers.</p>

            <h5>4. Sharing Your Information</h5>
            <p>We do not share, sell, or disclose your personal information to third parties, except:</p>
            <ul>
                <li>When required by law, such as in response to a court order or legal process.</li>
                <li>To protect our rights or property.</li>
            </ul>

            <h5>5. User Control and Data Management</h5>
            <p>You have the right to:</p>
            <ul>
                <li>Access your data by logging into your account.</li>
                <li>Request the deletion of your account and associated data by contacting us.</li>
                <li>Update your account information, such as email or username, through the website interface.</li>
                <li>Clear the localStorage data from your browser to remove the authentication token.</li>
            </ul>

            <h5>6. Cookies and Tracking</h5>
            <p>This website does not use cookies or track your activities outside of the GPA Calculator functionality.</p>

            <h5>7. Third-Party Services</h5>
            <p>This website does not integrate with or share information with any third-party services.</p>

            <h5>8. Changes to This Privacy Policy</h5>
            <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted within the website and will include the latest date of the update.</p>

            <h5>9. Contact Us</h5>
            <p>If you have any questions about this Privacy Policy or how your information is handled, please contact us at:
                <p><strong>Email:</strong> <a href="mailto:rufet.isr123@gmail.com">webalsat.az@gmail.com</a></p>

            </p>
        </div>
    );
}

export default Privacy;
