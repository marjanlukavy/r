import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { dropdownItems, dropdownItems1 } from "@/constants/dropdownItems";

function findLabelById(items, id) {
  const item = items.find((item) => item.id === id);
  return item ? item.label : null;
}

const BlogPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const label1 = findLabelById(dropdownItems, params?.sublinkId[0]);
  const label2 = findLabelById(dropdownItems1, params?.sublinkId[0]);

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.sublinkId[0] || !params?.sublinkId[1]) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/regions?label=${params.sublinkId[0]}&id=${params.sublinkId[1]}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData) {
            setData(jsonData);
          }
        } else {
          const response = await fetch(`http://localhost:5000/region`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const regions = await response.json();
          const regionData = regions[params?.sublinkId[0]];
          const item = regionData?.find(
            (item) => item.id === params?.sublinkId[1]
          );
          console.log(item);
          if (item) {
            setData({ content: item });
          } else {
            console.error("Data not found in local JSON");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.sublinkId]);

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
        <div
          className="jumbotron"
          style={{
            backgroundImage: `url(${data.content.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
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
            {data.content.region ?? label1 ?? label2}
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
