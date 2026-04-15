import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email.length > 0 ) {
            loginUser(email, password);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{marginBottom: '20px', color: '#333'}}>InSync-ILES</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        style={styles.input}

                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
    };

}
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' },
    card: { backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
    button: { padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' },
};

export default Login;
