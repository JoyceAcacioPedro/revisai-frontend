import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSubject.css';

function AddSubject() {
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("token");
    
    if (subject.trim() === "") {
      alert("Subject cannot be empty.");
      return;
    }

    try {
      const response = await fetch("${API_URL}/api/subject/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          subject_name: subject,
          progress: 0
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Subject created successfully!");
        setSubject(""); 
        navigate("/revisions"); 
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }

    } catch (error) {
      alert("Unable to connect to the server.");
      console.error(error);
    }
  };

  return (
    <div className="as-page">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="as-header">
        <h2 className="as-title">Add New Subject</h2>
        <p className="as-sub">Create a new core dynamic area to anchor your daily micro-revisions.</p>
      </div>

      {/* CONTAINER DO FORMULÁRIO */}
      <div className="as-card">
        <form onSubmit={handleSubmit} className="as-form">
          
          <div className="as-group">
            <label htmlFor="subject" className="as-label">Subject Name</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Cardiology, Constitutional Law, JavaScript"
              className="as-input"
              maxLength={50}
            />
          </div>

          <div className="as-actions">
            <button type="button" onClick={() => navigate("/revisions")} className="as-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="as-save-btn">
              Save Subject
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default AddSubject;