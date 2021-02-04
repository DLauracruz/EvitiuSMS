import React, { useContext, useState } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import useCollapse from "react-collapsed";

export const Table = ({ search }) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [openUserDetail, setOpenUserDetail] = useState(0);

  const { contactsState } = useContext(ContactsContext);
  const { contacts, activeFilter } = contactsState;

  return (
    <div className="admin__table scroll">
      {contacts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Expand</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(
              (contact, idx) =>
                (contact.role === activeFilter || activeFilter === "all") &&
                contact.name.toLowerCase().includes(search.toLowerCase()) && (
                  <tr key={contact._id}>
                    <td
                      {...getToggleProps({
                        onClick: () => {
                          setOpenUserDetail(idx);
                          if (isExpanded === false) {
                            setExpanded(true);
                          } else {
                            if (openUserDetail !== idx) {
                              setExpanded(true);
                            } else {
                              setExpanded(false);
                            }
                          }
                        },
                      })}
                    >
                      <i
                        className={`fas fa-caret-${
                          openUserDetail === idx && isExpanded
                            ? "down"
                            : "right"
                        }`}
                      ></i>
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.role}</td>
                    <td>{contact._id}</td>
                    <td>
                      <span>Actor</span>, <span>Cantante</span>,{" "}
                      <span>Filosofo</span>
                    </td>
                    <td>
                      <button>
                        <i className="far fa-edit"></i>
                      </button>
                    </td>
                    {openUserDetail === idx && (
                      <td
                        className="expanded-row-content"
                        {...getCollapseProps()}
                      >
                        <div>Email: {contact.email}</div>
                        <div>Role: {contact.role}</div>
                        <div>Phone: {contact.phone}</div>
                      </td>
                    )}
                  </tr>
                )
            )}
          </tbody>
        </table>
      ) : (
        <div className="error">
          <h3>
            No matches with <span>"{search}"</span>
          </h3>
          <p>Try to search with another name</p>
        </div>
      )}
    </div>
  );
};
