// src/CreateDocument.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateDocument() {
    const [formFields, setFormFields] = useState([{ field_type: 'Input', is_mandatory: false, field_name: '', select_values: '' }]);

    const handleFieldChange = (index, field, value) => {
        const newFormFields = [...formFields];
        newFormFields[index][field] = value;
        setFormFields(newFormFields);
    };

    const handleAddField = () => {
        setFormFields([...formFields, { field_type: 'Input', is_mandatory: false, field_name: '', select_values: '' }]);
    };

    const handleRemoveField = (index) => {
        const newFormFields = formFields.filter((_, i) => i !== index);
        setFormFields(newFormFields);
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8000/api/v1/documents/create', { document_name: 'New Document', form_values: formFields })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div className='create'>
            <div className='create-div'>

            <h1>Create Document</h1>
            {formFields.map((field, index) => (
                <div key={index}>
                    <select value={field.field_type} onChange={e => handleFieldChange(index, 'field_type', e.target.value)}>
                        <option value="Input">Input</option>
                        <option value="Select">Select</option>
                        <option value="NumberInput">NumberInput</option>
                    </select>
                    <input type="text" value={field.field_name} onChange={e => handleFieldChange(index, 'field_name', e.target.value)} />
                    {field.field_type === 'Select' && <input type="text" value={field.select_values} onChange={e => handleFieldChange(index, 'select_values', e.target.value)} />}
                    <button onClick={() => handleRemoveField(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddField}>Add More</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
        </div>

    );
}

export default CreateDocument;
