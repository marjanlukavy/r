import PopupWindow from "@/components/NationalParksInfo/PopupWindow";
import {
  dropdownItems as dropdownItemsData,
  dropdownItems1 as dropdownItems1Data,
} from "@/constants/dropdownItems";
import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoIosLogOut, IoIosAddCircleOutline } from "react-icons/io";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [additionalLinksVisible, setAdditionalLinksVisible] = useState(false);
  const [regionData, setRegionData] = useState({});
  const [updateCounter, setUpdateCounter] = useState(0); // State for triggering re-render

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const regionResponse = await fetch("http://localhost:5000/region");
        const regions = await regionResponse.json();
        setRegionData(regions);
      } catch (error) {
        console.error("Error fetching region data:", error);
      }
    };

    fetchRegionData();
  }, [updateCounter]); // Update when updateCounter changes

  const [dropdownItems, setDropdownItems] = useState([...dropdownItemsData]);

  useEffect(() => {
    const updatedDropdownItems = dropdownItemsData.map((item) => {
      const newItem = { ...item };
      if (regionData[item.id]) {
        const subItems = regionData[item.id].map((region) => ({
          label: region.title,
          url: `${item.id}/${region.id}`,
        }));
        newItem.subItems = [...(newItem.subItems || []), ...subItems];
      }
      return newItem;
    });
    setDropdownItems(updatedDropdownItems);
  }, [regionData, updateCounter]); // Update when regionData or updateCounter changes

  const [dropdownItems1, setDropdownItems1] = useState(
    JSON.parse(JSON.stringify(dropdownItems1Data))
  );

  useEffect(() => {
    const updatedDropdownItems1 = dropdownItems1.map((item) => {
      const newItem = { ...item };
      if (regionData[item.id]) {
        const existingSubItems = item.subItems || [];
        const newSubItems = regionData[item.id]
          .map((region) => ({
            label: region.title,
            url: `${item.id}/${region.id}`,
          }))
          .filter(
            (newItem) =>
              !existingSubItems.some(
                (existingItem) => existingItem.label === newItem.label
              )
          );
        newItem.subItems = [...existingSubItems, ...newSubItems];
      }
      return newItem;
    });
    setDropdownItems1(updatedDropdownItems1);
  }, [regionData, updateCounter]); // Update when regionData or updateCounter changes

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleAdditionalLinks = (e) => {
    e.stopPropagation();
    setAdditionalLinksVisible(!additionalLinksVisible);
  };

  const hideAdditionalLinks = (e) => {
    e.stopPropagation();

    setAdditionalLinksVisible(false);
  };

  const [popupVisible, setPopupVisible] = useState(false);

  const { user, logout } = useUser();

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleLogout = () => {
    logout();
  };

  const saveData = async (data, selectedRegion) => {
    try {
      const regionResponse = await fetch(`http://localhost:5000/region`);
      const regions = await regionResponse.json();

      regions[selectedRegion].push(data);

      const updateResponse = await fetch(`http://localhost:5000/region`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regions),
      });

      if (updateResponse.ok) {
        alert("Data saved successfully!");
        setUpdateCounter((prevCounter) => prevCounter + 1); // Increment updateCounter
        togglePopup();
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data.");
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link href="/">Парки України </Link>
      </div>
      <nav>
        <ul className="main-navigation">
          <li>
            <a href="#">ПРИРОДНІ ПАРКИ</a>
            <ul>
              {dropdownItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.id}>{item.label}</Link>
                  {item.subItems ? (
                    <ul className="sub-navigation">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={`${
                              subItem.url === "#"
                                ? `${item.id}/${subIndex + 1}`
                                : subItem.url
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <ul className="main-navigation">
          <li>
            <a href="#">ЗАПОВІДНИКИ</a>
            <ul>
              {dropdownItems1.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>{item.label}</a>
                  {item.subItems ? (
                    <ul className="sub-navigation">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={`${
                              subItem.url === "#"
                                ? `${item.id}/${subIndex + 1}`
                                : subItem.url
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
      <div className="header-right">
        {user ? (
          <>
            <IoIosAddCircleOutline className="icon" onClick={togglePopup} />
            <IoIosLogOut className="icon" onClick={handleLogout} />
          </>
        ) : (
          <>
            <Link href="/login" className="header-link">
              Login
            </Link>
            <Link href="/register" className="header-link">
              Register
            </Link>
          </>
        )}
      </div>

      {popupVisible && (
        <PopupWindow togglePopup={togglePopup} saveData={saveData} />
      )}
    </div>
  );
};

export default Header;
