import React, { useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Tahir Yar",
    email: "tahir@mail.com",
    phone: "03001234567",
    address: "Faisalabad, Pakistan",
    profileImg: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    role: "Restaurant Owner",
    joinDate: "2024-01-15",
    restaurant: "Tasty Bites Restaurant",
    totalOrders: 245,
    rating: 4.8
  });

  const [open, setOpen] = useState(false); 
  const [editData, setEditData] = useState(user);
  const [activeTab, setActiveTab] = useState("profile");
  const [uploading, setUploading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(editData);
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setEditData({ ...editData, profileImg: e.target.result });
          setUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  return (
    <div className="profile-container">
      {/* Main Profile Section */}
      <div className="profile-section">
        {/* Profile Header */}
        <div className="profile-header">
          <h1 className="page-title">
            <span className="title-icon">👤</span>
            User Profile
          </h1>
          <p className="page-subtitle">Manage your personal information and account settings</p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Personal Info
          </button>
          <button 
            className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            Account Settings
          </button>
          <button 
            className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {activeTab === "profile" && (
            <div className="profile-card">
              {/* Profile Header */}
              <div className="profile-header-section">
                <div className="profile-image-container">
                  <img src={user.profileImg} alt="profile" className="profile-image" />
                  <div className="image-actions">
                    <label className="upload-btn" htmlFor="image-upload">
                      {uploading ? (
                        <span className="uploading">Uploading...</span>
                      ) : (
                        <>
                          <span className="upload-icon">📷</span>
                          Change Photo
                        </>
                      )}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                
                <div className="profile-info-header">
                  <h2 className="profile-name">{user.name}</h2>
                  <div className="profile-role">{user.role}</div>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-number">{user.totalOrders}</span>
                      <span className="stat-label">Total Orders</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{user.rating}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">Rs. 45,600</span>
                      <span className="stat-label">Revenue</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="profile-details">
                <div className="details-section">
                  <h3 className="section-title">Contact Information</h3>
                  <div className="detail-item">
                    <div className="detail-icon">📧</div>
                    <div className="detail-content">
                      <span className="detail-label">Email Address</span>
                      <span className="detail-value">{user.email}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">📱</div>
                    <div className="detail-content">
                      <span className="detail-label">Phone Number</span>
                      <span className="detail-value">{user.phone}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div className="detail-content">
                      <span className="detail-label">Address</span>
                      <span className="detail-value">{user.address}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h3 className="section-title">Restaurant Information</h3>
                  <div className="detail-item">
                    <div className="detail-icon">🏢</div>
                    <div className="detail-content">
                      <span className="detail-label">Restaurant Name</span>
                      <span className="detail-value">{user.restaurant}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-content">
                      <span className="detail-label">Member Since</span>
                      <span className="detail-value">{user.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="profile-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => setOpen(true)}
                >
                  <span className="btn-icon">✏️</span>
                  Edit Profile
                </button>
                <button className="action-btn change-password">
                  <span className="btn-icon">🔒</span>
                  Change Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="account-settings">
              <h3>Account Settings</h3>
              <p>Manage your account preferences and security settings.</p>
              {/* Add account settings content here */}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="activity-log">
              <h3>Recent Activity</h3>
              <p>View your recent orders and activities.</p>
              {/* Add activity log content here */}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                <span className="modal-icon">✏️</span>
                Edit Profile Information
              </h2>
              <button className="close-btn" onClick={() => setOpen(false)}>
                <span className="close-icon">×</span>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-section">
                <h4 className="form-section-title">Basic Information</h4>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Additional Information</h4>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="form-textarea"
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Restaurant Name</label>
                  <input
                    type="text"
                    value={editData.restaurant}
                    onChange={(e) => setEditData({ ...editData, restaurant: e.target.value })}
                    className="form-input"
                    placeholder="Enter restaurant name"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="modal-btn cancel-btn"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-btn save-btn"
                >
                  <span className="save-icon">💾</span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-container {
          padding: 30px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .profile-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 1.8rem;
        }

        .page-subtitle {
          color: #718096;
          font-size: 1.1rem;
        }

        .profile-tabs {
          display: flex;
          gap: 4px;
          background: white;
          padding: 8px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
        }

        .tab-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #718096;
        }

        .tab-btn:hover {
          background: #f1f5f9;
          color: #4b5563;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        .profile-header-section {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f1f5f9;
        }

        .profile-image-container {
          position: relative;
          flex-shrink: 0;
        }

        .profile-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid #e2e8f0;
          object-fit: cover;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .image-actions {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }

        .upload-btn {
          background: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .upload-btn:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .upload-icon {
          font-size: 0.8rem;
        }

        .uploading {
          color: #64748b;
        }

        .profile-info-header {
          flex: 1;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .profile-role {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 24px;
        }

        .profile-stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          min-width: 100px;
          border: 1px solid #e2e8f0;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .profile-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .profile-details {
            grid-template-columns: 1fr;
          }
        }

        .details-section {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e2e8f0;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e2e8f0;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .detail-icon {
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: #667eea;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          display: block;
          font-size: 0.75rem;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .detail-value {
          display: block;
          font-weight: 500;
          color: #1a202c;
          font-size: 0.95rem;
        }

        .profile-actions {
          display: flex;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .action-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .edit-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .change-password {
          background: #f3f4f6;
          color: #4b5563;
        }

        .change-password:hover {
          background: #e5e7eb;
        }

        .btn-icon {
          font-size: 0.9rem;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 500px;
          max-width: 90vw;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-icon {
          font-size: 1.2rem;
        }

        .close-btn {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #f1f5f9;
          color: #374151;
        }

        .modal-form {
          padding: 32px;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .form-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: #fafafa;
          font-family: inherit;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-textarea {
          resize: vertical;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .modal-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background: #f3f4f6;
          color: #4b5563;
        }

        .cancel-btn:hover {
          background: #e5e7eb;
        }

        .save-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .save-btn:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-2px);
        }

        .save-icon {
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-container {
            padding: 20px;
          }

          .profile-header-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-stats {
            justify-content: center;
            flex-wrap: wrap;
          }

          .profile-actions {
            flex-direction: column;
          }

          .modal-content {
            width: 90%;
          }
        }

        @media (max-width: 480px) {
          .profile-container {
            padding: 16px;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .profile-card {
            padding: 24px;
          }

          .profile-name {
            font-size: 1.75rem;
          }

          .modal-form {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}