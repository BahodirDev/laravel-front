
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function DocumentPreview() {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/document/${id}`)
            .then(response => {
                setDocument(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching document');
                setLoading(false);
            });
    }, [id]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    console.log(document?.configurations);
    return (
        <div className='document-preview-div'>

        <div className='document-preview'>
            <h1>{document.documentName}</h1>
            {document.configurations?.map(field => (
                <div key={field.id}>
                    <label>{field.field_name}</label>
                    {field.field_type === 1 && <input type="text" />}
                    {field.field_type === 2 && (
                        <select >
                            {field.select_values && JSON.parse(field.select_values).map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    )}
                    {field.field_type === 3 && <input type="number" />}
                </div>
            ))}
            <Link to={'/'}>Back</Link>
        </div>
        </div>

    );
}

export default DocumentPreview;
