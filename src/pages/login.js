import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { useUser } from "@/providers/UserProvider";

const Login = () => {
  const router = useRouter();
  const { login } = useUser();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${formData.username}&password=${formData.password}`
      );
      const users = await res.json();
      if (users.length > 0) {
        login(users[0]);
        router.push("/");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Error during login.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Login</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>
              Login
            </button>
            <div className={styles.registerLink}>
              Don't have an account? <Link href="/register">Register here</Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
