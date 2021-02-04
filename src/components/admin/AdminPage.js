import React, { useState } from "react";
import { Panel } from "./Panel";
import { Table } from "./Table";

export const AdminPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="admin__page animate__animated  animate__fadeIn">
      <Panel setSearch={setSearch} search={search} />
      <Table search={search} />
    </div>
  );
};
