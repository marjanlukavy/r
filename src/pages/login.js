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
        alert("Невірне ім'я користувача або пароль.");
      }
    } catch (error) {
      console.error("Вхід не вдалося", error);
      alert("Помилка під час входу.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Вхід</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Ім'я користувача:</label>
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
              <label htmlFor="password">Пароль:</label>
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
              Увійти
            </button>
            <div className={styles.registerLink}>
              Немаєте облікового запису?{" "}
              <Link href="/register">
                <b>Зареєструйтесь тут</b>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
