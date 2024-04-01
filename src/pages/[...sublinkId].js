import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const BlogPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/regions?label=${params.sublinkId[0]}&id=${params.sublinkId[1]}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: Data not found</div>;
  }

  return (
    <>
      <Header />

      <div className="blog-page">
        <div className="jumbotron">
          <h1>{data.content.title}</h1>
        </div>
        <div className="breadcrumb">
          <span onClick={() => router.push("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="width"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="white"
            className="width"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>

          <span
          // onClick={() => router.push(`/regions/${router.query.regionId}`)}
          >
            {data.content.region}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="white"
            className="width"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>

          <span>{data.content.title}</span>
        </div>

        <div className="paragraphs">
          {data.content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
