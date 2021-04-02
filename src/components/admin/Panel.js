import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { AddUser } from "../popup/AddUser";

import { CSVLink, CSVDownload } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AddClient } from "../popup/AddClient";
import { ChangeRole } from "../popup/ChangeRole";

export const Panel = ({ setSearch, search }) => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeFilter, contacts } = contactsState;

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  const headers = ["Name", "Role", "Teams", "Email", "Phone"];

  const data = contacts.map((contact) => [
    contact.name,
    contact.role,
    contact.teams.map((team) => team.name),
    contact.email,
    contact.phone,
  ]);

  const filters = ["personal", "admin", "all"];

  const setActivefilter = (filter) =>
    dispatch({ type: types.setActiveFilter, payload: filter });

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Admin Report";
    const headers = [["Name", "Role", "Teams", "Email", "Phone"]];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div className="admin__panel">
      <h4>Admin Panel</h4>
      <input
        onChange={searchContact}
        value={search}
        type="text"
        placeholder="Search..."
      />

      <AddUser
        oppened={true}
        trigger={
          <button className="btn btn-primary btn-block">
            Add User <i className="fa fa-plus"></i>
          </button>
        }
      />
      <AddClient
        oppened={true}
        trigger={
          <button className="btn btn-primary btn-block">
            Add Client <i class="fas fa-male"></i>
          </button>
        }
      />
      <ChangeRole
        oppened={true}
        trigger={
          <button className="btn btn-primary btn-block">
            Change Role <i class="fas fa-male"></i>
          </button>
        }
      />
      <button className="btn btn-outline-secondary btn-block">
        Import Customers
      </button>
      <button onClick={exportPDF} className="btn btn-outline-primary btn-block">
        Export PDF
      </button>
      <CSVLink headers={headers} filename={"random.csv"} data={data}>
        Export CSV
      </CSVLink>

      <ul className="admin__panel-container b-shadow">
        {filters.map((filter, idx) => (
          <li
            onClick={() => setActivefilter(filter)}
            className={`${activeFilter === filter && "admin__panel-selected"}`}
            key={idx}
          >
            {filter.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};
