'use client';

import { useAuth } from '@/hooks/auth';
import { changeUserPassword } from '@/requests/profile';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Profile() {
  const { user } = useAuth({ middleware: 'auth' });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [newPasswordInputType, setNewPasswordInputType] = useState('password');
  const [confirmPasswordInputType, setConfirmPasswordInputType] =
    useState('password');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Confirm Password Not Matched',
        timer: 2000,
        icon: 'error',
      });

      return;
    }

    const response = await changeUserPassword(oldPassword, newPassword);

    if (response?.status === 200) {
      Swal.fire({
        title: 'Password Update Successfully',
        timer: 2000,
        icon: 'success',
      });
    }
  };

  return (
    <div className="hero-section">
      <Container>
        <Row>
          <Col itme md={12}>
            <div className="mind-login">
              <div className="updt-profile">
                <form onSubmit={handleSubmit}>
                  <div className="user-profile-dtl">
                    <div className="form-gorup">
                      <label>Old Password</label>
                      <input
                        type="text"
                        placeholder="Old Password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-gorup pss-work">
                      <label>New Password</label>
                      <input
                        type={newPasswordInputType}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <i>
                        {newPasswordInputType === 'password' ? (
                          <img
                            style={{ cursor: 'pointer' }}
                            src="/icons/view.svg"
                            alt="eye"
                            onClick={() => setNewPasswordInputType('text')}
                          />
                        ) : (
                          <img
                            style={{ cursor: 'pointer' }}
                            src="/icons/hidden.svg"
                            alt="eye"
                            onClick={() => setNewPasswordInputType('password')}
                          />
                        )}
                      </i>
                    </div>
                    <div className="form-gorup pss-work">
                      <label>Confirm Password</label>
                      <input
                        type={confirmPasswordInputType}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <i>
                        {confirmPasswordInputType === 'password' ? (
                          <img
                            style={{ cursor: 'pointer' }}
                            src="/icons/view.svg"
                            alt="eye"
                            onClick={() => setConfirmPasswordInputType('text')}
                          />
                        ) : (
                          <img
                            style={{ cursor: 'pointer' }}
                            src="/icons/hidden.svg"
                            alt="eye"
                            onClick={() =>
                              setConfirmPasswordInputType('password')
                            }
                          />
                        )}
                      </i>
                    </div>
                    <div className="edit-profile-btn mt-5 text-center">
                      <button type="submit">Change Password</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
