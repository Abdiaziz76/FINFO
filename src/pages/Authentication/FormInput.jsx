import React from 'react';

const FormInput = ({ type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded outline-blue-600"
        required
      />
    </div>
  );
};

export default FormInput;
