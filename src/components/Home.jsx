import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"; // Assuming your CSS file is named "Home.css"

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Fetch the paste details when pasteId is in URL
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  // Function to create or update a paste
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste)); // Update paste if pasteId exists
    } else {
      dispatch(addToPastes(paste)); // Create new paste if no pasteId
    }

    // Reset fields after saving
    setTitle("");
    setValue("");
    setsearchParams({});
  }

  return (
    <div className="home-container">
      {/* Header */}
      <h1 className="header-text">Store, Organize, and Share Your Ideas</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="textarea-container">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text here"
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
