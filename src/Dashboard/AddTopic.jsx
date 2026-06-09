import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTopic.css';

function AddTopic() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/subject/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Erro ao carregar subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!title.trim() || !subjectId) {
      alert('All fields are required.');
      return;
    }

    const token = localStorage.getItem('token');

   const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('subject', subjectId);
  const userId = localStorage.getItem('userId'); 
  if (userId) {
    formData.append('user', userId);
}

files.forEach((f) => formData.append('files', f));

    try {
      const response = await fetch('http://localhost:8000/api/topics/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Topic created successfully!');
        setTitle(''); setContent(''); setSubjectId(''); setFiles([]);
        navigate('/revisions');
      } else {
        alert('Error: ' + JSON.stringify(data));
      }

    } catch (error) {
      alert('Unable to connect to the server.');
      console.error(error);
    }
  };

  return (
    <div className="at-wrap">
      <div className="at-card">

        <div className="at-header">
          <h2 className="at-title">Add new topic</h2>
          <p className="at-sub">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="at-group">
            <label className="at-label">Subject</label>
            <select
              className="at-input"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">-- Select a subject --</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.subject_name}</option>
              ))}
            </select>
          </div>

          <div className="at-group">
            <label className="at-label">Topic name</label>
            <input
              className="at-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Newton's Laws"
            />
          </div>

          <div className="at-group">
            <label className="at-label">Notes</label>
            <textarea
              className="at-input at-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your study notes here..."
              rows="5"
            />
          </div>

          <div className="at-group">
            <label className="at-label">Attachments</label>
            <label className="at-upload">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg"
                onChange={handleFiles}
                className="at-file-input"
              />
              <div className="at-upload-box">
                <span className="at-upload-icon">📎</span>
                <p className="at-upload-text">Click to upload files</p>
                <p className="at-upload-sub">.pdf, .doc, .docx, .ppt, .txt, images</p>
              </div>
            </label>

            {files.length > 0 && (
              <div className="at-file-list">
                {files.map((f, i) => (
                  <div key={i} className="at-file-item">
                    <span className="at-file-icon">📄</span>
                    <span className="at-file-name">{f.name}</span>
                    <span className="at-file-size">{(f.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="at-btn">Save topic</button>

        </form>
      </div>
    </div>
  );
}

export default AddTopic;