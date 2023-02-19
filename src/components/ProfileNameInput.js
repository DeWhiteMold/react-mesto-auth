import { useState, useEffect } from "react";

function ProfileNameInput({userName, onInput, isOpen}) {
  const [value, setValue] = useState(userName);

  function handleChange(e) {
    setValue(e.target.value);
    onInput(e.target.value);
  }

  useEffect(() => {
    setValue(userName || '');
  }, [userName, isOpen]);

  return (
    <input type="text" name="description" className="pop-up__input pop-up__input_type_description" 
      placeholder="Исследователь океана" required minLength="2" maxLength="200" 
      value={value} onInput={handleChange} />
  )
}

export default ProfileNameInput;