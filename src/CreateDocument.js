// src/CreateDocument.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateDocument() {
//     const [formFields, setFormFields] = useState([{ field_type: 'Input', is_mandatory: false, field_name: '', select_values: '' }]);

//     const handleFieldChange = (index, field, value) => {
//         const newFormFields = [...formFields];
//         newFormFields[index][field] = value;
//         setFormFields(newFormFields);
//     };

//     const handleAddField = () => {
//         setFormFields([...formFields, { field_type: 'Input', is_mandatory: false, field_name: '', select_values: '' }]);
//     };

//     const handleRemoveField = (index) => {
//         const newFormFields = formFields.filter((_, i) => i !== index);
//         setFormFields(newFormFields);
//     };

//     const handleSubmit = () => {
//         axios.post('http://localhost:8000/api/v1/documents/create', { document_name: 'New Document', form_values: formFields })
//             .then(response => console.log(response.data))
//             .catch(error => console.error(error));
//     };

//     return (
//         <div className='create'>
//             <div className='create-div'>

//             <h1>Create Document</h1>
//             {formFields.map((field, index) => (
//                 <div key={index}>
//                     <select value={field.field_type} onChange={e => handleFieldChange(index, 'field_type', e.target.value)}>
//                         <option value="Input">Input</option>
//                         <option value="Select">Select</option>
//                         <option value="NumberInput">NumberInput</option>
//                     </select>
//                     <input type="text" value={field.field_name} onChange={e => handleFieldChange(index, 'field_name', e.target.value)} />
//                     {field.field_type === 'Select' && <input type="text" value={field.select_values} onChange={e => handleFieldChange(index, 'select_values', e.target.value)} />}
//                     <button onClick={() => handleRemoveField(index)}>Remove</button>
//                 </div>
//             ))}
//             <button onClick={handleAddField}>Add More</button>
//             <button onClick={handleSubmit}>Save</button>
//         </div>
//         </div>

//     );
// }

// export default CreateDocument;


// src/CreateDocument.js
import React, { useState } from 'react';
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
        const formattedFields = formFields.map((field, index) => ({
            field_seq: (index + 1) * 10,
            is_mandatory: field.is_mandatory ? 1 : 0,
            field_type: parseInt(field.field_type, 10),
            field_name: field.field_name,
            select_values: field.field_type === '2' ? JSON.parse(field.select_values) : null
        }));

        axios.post('http://localhost:8000/api/v1/documents/create', { document_name: 'New Document', form_values: formattedFields })
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
            </div>
        </div>
    );
}

export default CreateDocument;
