import { useState } from "react";

const PopupWindow = ({ togglePopup, saveData }) => {
  const [tab, setTab] = useState("park");
  const [selectedRegion, setSelectedRegion] = useState(
    tab === "park" ? "zakarpattia" : "biosferni"
  );
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    paragraphs: [],
  });

  const parkRegions = [
    "zakarpattia",
    "volyn",
    "zaporizhzhia",
    "ivano_frankivsk",
    "kyiv",
    "lviv",
    "odesa",
    "rivne",
    "sumy",
    "ternopil",
    "kharkiv",
    "kherson",
    "khmelnytskyi",
  ];
  const reserves = ["biosferni", "pryrodni"];

  const handleChange = (e) => {
    if (e.target.name === "paragraphs") {
      setFormData({ ...formData, paragraphs: e.target.value.split("\n") });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData(formData, selectedRegion);
  };

  return (
    <div className="popup">
      <div className="tabs">
        <button
          className={tab === "park" ? "active" : ""}
          onClick={() => setTab("park")}
        >
          Парк
        </button>
        <button
          className={tab === "reserve" ? "active" : ""}
          onClick={() => setTab("reserve")}
        >
          Заповідники
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {tab === "park" ? (
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {parkRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {reserves.map((reserve) => (
              <option key={reserve} value={reserve}>
                {reserve}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID"
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Заголовок"
          required
        />
        <textarea
          name="paragraphs"
          value={formData.paragraphs.join("\n")}
          onChange={handleChange}
          placeholder="Опис"
          required
        />
        <button type="submit">Зберегти</button>
      </form>
      <button className="closeButton" onClick={togglePopup}>
        Закрити
      </button>
    </div>
  );
};

export default PopupWindow;
