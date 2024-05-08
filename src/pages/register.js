import { useState } from "react";
import styles from "../styles/Register.module.css";
import { useRouter } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ username: "", password: "", email: "" });
        router.push("/login");
      } else {
      }
    } catch (error) {
      console.error("Failed to register", error);
      alert("Error during registration.");
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Створити аккаунт</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Ім'я:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Пошта:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Зареєструйтесь
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
