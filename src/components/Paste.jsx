import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Paste.css"; // Import the new CSS file

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();
  const [searchterm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully!");
  }

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search Item here"
          value={searchterm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="paste-container">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className="paste-box" key={paste?._id}>
              <div className="paste-content">
                <div className="paste-title">{paste.title}</div>
                <div className="paste-text">{paste.content}</div>
              </div>

              <div className="paste-actions">
                <button
                  className="action-btn"
                  onClick={() => navigate(`/?pasteId=${paste?._id}`)}
                >
                  <i className="fas fa-pencil-alt"></i> {/* Edit Icon */}
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(paste?._id)}
                >
                  <i className="fas fa-trash"></i> {/* Delete Icon */}
                </button>
                <button
                  className="action-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <i className="fas fa-copy"></i> {/* Copy Icon */}
                </button>
                <button
                  className="action-btn"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste?.title || "Shared Paste",
                          text: paste?.content || "Check out this paste!",
                          url: window.location.href,
                        })
                        .then(() => {
                          toast.success("Shared successfully!");
                        });
                    }
                  }}
                >
                  <i className="fas fa-share-alt"></i> {/* Share Icon */}
                </button>
              </div>
              <div className="paste-created-at">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
