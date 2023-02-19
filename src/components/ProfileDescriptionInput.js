import { useState, useEffect } from "react";

function ProfileDescriptionInput({userDescription, onInput}) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
    onInput(e.target.value);
  }

  useEffect(() => {
    setValue(userDescription || '')
  }, [userDescription])

  return (
    <input type="text" name="name" className="pop-up__input pop-up__input_type_name"
      placeholder="Жак-Ив Кусто" required minLength="2" maxLength="40"
      value={value} onChange={handleChange} />
  )
}

export default ProfileDescriptionInput;