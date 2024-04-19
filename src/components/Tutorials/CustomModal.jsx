import { Button } from 'react-bootstrap';
import { useState } from 'react';
import {
  addTutorialNote,
  deleteTutorialNote,
  editTutorialNote,
} from '@/requests/tutorial';
import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function CustomModal(props) {
  const [id, setID] = useState();
  const [notes, setNote] = useState('');
  const [fordm, Setform] = useState(false);
  const videoData = props?.maindata;
  const [updatedData, setUpdatedData] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Function to fetch updated data
  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${props.user_detail?.id}/tutorials/${props.tutorial_id}/notes`);
      const newData = response.data.userTutorialNotes;
      setUpdatedData(newData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchUpdatedData();
  }, [props.user_detail?.id, props.tutorial_id]);

  const handleSubmit = async () => {
    try {
      await addTutorialNote(props.tutorial_id, notes);
      Setform(false);
      setNote('');
      // Fetch updated data after adding a note
      fetchUpdatedData();
      setUpdatedData(newData);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  const handleUpdate = async () => {
    try {
      const tutorial_id = props.tutorial_id;
      const user_detail = props.user_detail;
      await editTutorialNote(tutorial_id, id, notes);
      // Fetch updated data after updating a note
      fetchUpdatedData();
      Setform(false);
      setNote('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  const DeleteNote = async (id) => {
    try {
      await deleteTutorialNote(id);
      // Fetch updated data after deleting a note
      fetchUpdatedData();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleDeleteNote = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        DeleteNote(id);
        Swal.fire(
            'Deleted!',
            'Your note has been deleted.',
            'success'
        );
      }
    });
  };
  const EditNotes = (val) => {
    setID(val?.id);
    setNote(val?.notes);
    Setform(true);
  };

  return (
    <div>
      <div>
        <h4 className="click-btm" onClick={() => Setform(true)}>
          {props.label}
        </h4>

        {fordm ? (
          <>
            <textarea
              style={{
                width: '100%',
                height: '10rem',
                outline: 0,
                border: '3px solid lightgrey',
              }}
              onChange={(e) => setNote(e.target.value)}
              value={notes}
            />
            {id ? (
              <Button className="mb-3 click-btm" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button className="mb-3 click-btm" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </>
        ) : (
          ''
        )}
      </div>

      {updatedData && updatedData.length > 0 ? (
          updatedData.map((val, i) => (
              <React.Fragment key={i}>
                <div className="tutorial-note">
                  <div>
                    <p>{val?.notes}</p>
                  </div>
                  <div>
                    <button
                        className="mx-3 click-btm"
                        onClick={() => EditNotes(val)}
                    >
                      Edit
                    </button>
                    <button
                        className="click-btm"
                        onClick={() => handleDeleteNote(val?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <hr />
              </React.Fragment>
          ))
      ) : (
          videoData?.get_notes && videoData?.get_notes.length > 0 ? (
              videoData?.get_notes.map((val, i) => (
                  <React.Fragment key={Math.random()}>
                    <div className="tutorial-note">
                      <div>
                        <p>{val?.notes}</p>
                      </div>
                      <div>
                        <button
                            className="mx-3 click-btm"
                            onClick={() => EditNotes(val)}
                        >
                          Edit
                        </button>
                        <button
                            className="click-btm"
                            onClick={() => handleDeleteNote(val?.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
              ))
          ) : null
      )}
    </div>
  );
}
