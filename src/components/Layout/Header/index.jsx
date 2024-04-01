import { dropdownItems, dropdownItems1 } from "@/constants/dropdownItems";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [additionalLinksVisible, setAdditionalLinksVisible] = useState(false);

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

  return (
    <div className="header">
      <div className="header-left">
        <Link href="/">Парки України</Link>
      </div>
      <nav>
        <ul className="main-navigation">
          <li>
            <a href="#">ПРИРОДНІ ПАРКИ</a>
            <ul>
              {dropdownItems.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>{item.label}</a>
                  {item.subItems ? (
                    <ul className="sub-navigation">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={`${item.id}/${subIndex + 1}`}>
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
                          <Link href={`${item.id}/${subIndex + 1}`}>
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
    </div>
  );
};

export default Header;
