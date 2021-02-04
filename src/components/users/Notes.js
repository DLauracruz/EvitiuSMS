import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import Swal from "sweetalert2";

export const Notes = () => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeContact } = contactsState;
  const [note, setNote] = useState("");
  const { addToast } = useToasts();

  const onChange = ({ target }) => {
    setNote(target.value);
  };

  const addNote = () => {
    if (note.length > 0) {
      dispatch({ type: types.addNote, payload: note });
      addToast(`Note '${note}' was added successfully.`, {
        appearance: "success",
      });
    } else {
      addToast(`You need to write somenthig if you want to add a note.`, {
        appearance: "error",
      });
    }
    setNote("");
  };

  const editNote = (id, note) => {
    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
      input: "textarea",
      inputPlaceholder: "Type your message here...",
      inputLabel: "Edit Note",
      inputValue: note,
    }).then(async (data) => {
      if (data.isConfirmed) {
        await dispatch({
          type: types.editNote,
          payload: { idx: id, note: data.value },
        });
        addToast(`Note edited successfully.`, {
          appearance: "info",
        });
      }
    });
  };

  const deleteNote = (id, note) => {
    Swal.fire({
      allowOutsideClick: false,
      icon: "warning",
      html: "Are you sure that you want delete this note?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (data) => {
      if (data.isConfirmed) {
        await dispatch({
          type: types.deleteNote,
          payload: id,
        });
        addToast(`Note '${note}' deleted successfully.`, {
          appearance: "warning",
        });
      }
    });
  };

  return (
    <div className="notes">
      <div className="notes__header">
        <div className="notes__user-info b-shadow">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <div>
            <h3>{activeContact.name}</h3>
            <span>{activeContact.phone}</span>
          </div>
        </div>
      </div>

      <h4>Notes</h4>
      <div className="notes__container scroll b-shadow">
        <ul>
          {activeContact.notes.map((note, idx) => (
            <li key={idx}>
              <i className="far fa-sticky-note"></i>
              <p>{note}</p>
              <div className="notes_options">
                <i
                  onClick={() => editNote(idx, note)}
                  className="fas fa-edit"
                ></i>
                <i
                  onClick={() => deleteNote(idx, note)}
                  className="fa fa-trash"
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notes__input">
        <input
          onChange={onChange}
          value={note}
          type="text"
          placeholder="Write a note..."
        />
        <button onClick={addNote}>
          Add Note <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};
