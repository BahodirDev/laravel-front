

// src/CreateDocument.js
import React, { useState } from 'react';
import {Link, redirect} from 'react-router-dom'
import axios from 'axios';

function CreateDocument() {
    const [formFields, setFormFields] = useState([{ field_type: '1', is_mandatory: false, field_name: '', select_values: '' }]);

    const handleFieldChange = (index, field, value) => {
        const newFormFields = [...formFields];
        newFormFields[index][field] = value;
        setFormFields(newFormFields);
    };

    const handleAddField = () => {
        setFormFields([...formFields, { field_type: '1', is_mandatory: false, field_name: '', select_values: '' }]);
    };

    const handleRemoveField = (index) => {
        const newFormFields = formFields.filter((_, i) => i !== index);
        setFormFields(newFormFields);
    };

    const handleSubmit = () => {
        const formattedFields = formFields.map((field, index) => {
            let selectValues = null;
            if (field.field_type === '2') {
                try {
                    selectValues = JSON.parse(field.select_values);
                } catch (e) {
                    console.error('Invalid JSON in select_values');
                }
            }

            return {
                field_seq: (index + 1) * 10,
                is_mandatory: field.is_mandatory ? 1 : 0,
                field_type: parseInt(field.field_type, 10),
                field_name: field.field_name,
                select_values: selectValues
            };
        });

        axios.post('http://localhost:8000/api/v1/documents/create', {
            document_name: 'New Document',
            form_values: formattedFields
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.error(error));
    };

    return (
        <div className='create'>
            <div className='create-div'>
                <h1>Create Document</h1>
                {formFields.map((field, index) => (
                    <div key={index}>
                        <select value={field.field_type} onChange={e => handleFieldChange(index, 'field_type', e.target.value)}>
                            <option value="1">Input</option>
                            <option value="2">Select</option>
                            <option value="3">NumberInput</option>
                        </select>
                        <input type="text" placeholder="Field Name" value={field.field_name} onChange={e => handleFieldChange(index, 'field_name', e.target.value)} />
                        {field.field_type === '2' && (
                            <input type="text" placeholder='Select Values (JSON)' value={field.select_values} onChange={e => handleFieldChange(index, 'select_values', e.target.value)} />
                        )}
                        <label>
                            Mandatory:
                            <input type="checkbox" checked={field.is_mandatory} onChange={e => handleFieldChange(index, 'is_mandatory', e.target.checked)} />
                        </label>
                        <button onClick={() => handleRemoveField(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddField}>Add More</button>
                <button onClick={handleSubmit}>Save</button>
                <Link to={'/'}>Back</Link>

            </div>
        </div>
    );
}

export default CreateDocument;
