// src/DocumentsTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DocumentsTable() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/documents')
            .then(response => setDocuments(response.data))
            .catch(error => console.error(error));
    }, []);
    console.log({documents});
    return (
        <div className='document-list-wrapper'>
          <table className="document-table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">DOCUMENT TITLE</th>
                <th className="table-header">CREATED DATE</th>
                <th className="table-header">DOCUMENT SIZE</th>
                <th className="table-header text-center">
                <Link to="/create">Create New Document</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td className="table-cell">{doc.id}</td>
                  <td className="table-cell">{doc.document_name}</td>
                  <td className="table-cell">{doc.created_at}</td>
                  <td className="table-cell">{doc.field_count}</td>  {/* Assuming document size is stored in field_count */}
                  {/* Add a link to the document preview route */}
                  <td className="table-cell text-center">
                    <Link to={`/preview/${doc.id}`}>Document preview</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default DocumentsTable;
