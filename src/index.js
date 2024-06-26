import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './App.css'
import DocumentsTable from './DocumentsTable';
import CreateDocument from './CreateDocument';
import DocumentPreview from './DocumentPreview';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<DocumentsTable />} />
            <Route path="/create" element={<CreateDocument />} />
            <Route path="/preview/:id" element={<DocumentPreview />}  />
            <Route path="/ish" element={<h3>Salom</h3>} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
