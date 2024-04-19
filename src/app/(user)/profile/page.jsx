'use client';

import { useAuth } from '@/hooks/auth';
import { useProfile } from '@/hooks/profile';
import { handleImageUrl } from '@/lib/utils';
import { updateUserProfile } from '@/requests/profile';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Profile() {
  const { user } = useAuth({ middleware: 'auth' });
  const { data: profile, isLoading } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [name, setName] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  const loadFile = (e) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
      setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserProfile(user.id, name, selectedImage);
  };

  return (
    <div className="hero-section">
      <Container>
        <Row>
          {!isLoading && profile && (
            <Col itme md={12}>
              <div className="mind-login">
                <div className={isEditing === true ? 'see-profile' : ''}>
                  <div className="profile-img">
                    {profile.profile_photo_path ? (
                      <img
                        src={handleImageUrl(profile.profile_photo_path)}
                        alt="profile icon"
                      />
                    ) : (
                      <img
                        src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                        height="40px"
                        width={'40px'}
                        style={{
                          borderRadius: '50px',
                          marginRight: '20px',
                        }}
                      />
                    )}
                  </div>
                  <div className="user-profile-dtl">
                    <div className="form-gorup">
                      <label>Name</label>
                      <h3>{profile.name}</h3>
                    </div>
                    <div className="form-gorup">
                      <label>Email</label>
                      <h3>{profile.email}</h3>
                    </div>
                    <div className="edit-profile-btn mt-5 text-center">
                      {profile.google_id === null &&
                      profile.facebook_id === null &&
                      isEditable ? (
                        <button onClick={() => setIsEditing(!isEditing)}>
                          Edit Profile
                        </button>
                      ) : (
                        'You Cannot Update Your Profile'
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    isEditing === true ? 'updt-profile' : 'edit-profile'
                  }
                >
                  <form onSubmit={handleSubmit}>
                    <div className="profile-img">
                      <Paper className="upload-img-user">
                        <Box
                          className="img-up"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="file"
                            onChange={loadFile}
                            style={{ display: 'none' }}
                          />

                          <img
                            src={
                              selectedImageUrl
                                ? selectedImageUrl
                                : profile?.profile_photo_path
                                ? handleImageUrl(profile?.profile_photo_path)
                                : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
                            }
                            alt="img"
                          />
                        </Box>
                        <Box className="upload-icon">
                          <label htmlFor="file" style={{ cursor: 'pointer' }}>
                            <img src="/icons/photo-camera.svg" />
                          </label>
                        </Box>
                      </Paper>
                    </div>
                    <div className="user-profile-dtl">
                      <div className="form-gorup">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Full Name"
                          defaultValue={profile.name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-gorup">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={profile.email}
                          disabled
                        />
                      </div>
                      <div className="edit-profile-btn mt-5 text-center">
                        <button type="submit">Update Profile</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
