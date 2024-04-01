import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Hero";
import NationalParksInfo from "@/components/NationalParksInfo";
import Footer from "@/components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const slides = [
  "https://plus.unsplash.com/premium_photo-1668181115324-99c4fd0a68ec?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1681551240215-95ea406309b1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1668196796572-36e355bd719a?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero slides={slides} />
        <NationalParksInfo />
      </main>
      <Footer />
    </>
  );
}
