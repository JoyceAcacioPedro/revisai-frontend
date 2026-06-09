import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddRevisions.css';

function AddRevisions() {


  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="addrev-container">

      {/* Botão principal */}
      <button className="open-btn" onClick={() => setIsOpen(true)}>
        Add Revision
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3>What would you like to add?</h3>

            <div className="modal-buttons">
              <Link to="/addsubject" className="modal-btn">
                Subject
              </Link>

              <Link to="/addtopic" className="modal-btn">
                Topic
              </Link>
            </div>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default AddRevisions;