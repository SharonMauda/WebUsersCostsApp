import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { URL } from './utils';

// The cost component is used to register a new user to the database.
const Register = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    // Send the data to the server.
    const resp = await fetch(`${URL}/user`, options);
    setLoading(false);
    // Check if response is ok
    if (resp.ok) {
      setError(undefined);
      // Set success message.
      setSuccess('הרשמה הצליחה');
    } else {
      setSuccess(undefined);
      // Set error as the response's body
      const error = await resp.text();
      setError(error);
    }
  };

  return (
    <div dir="rtl">
      <h2>הרשמת משתמש</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>תעודת זהות: </label>
        <input {...register('_id')} />
        <label>שם פרטי: </label>
        <input {...register('first_name')} />
        <label>שם משפחה: </label>
        <input {...register('last_name')} />
        <label>תאריך לידה: </label>
        <input type="date" {...register('birthday')} />
        <label>מצב משפחתי: </label>
        <select {...register('marital_status')}>
          <option value="single">רווק/ה</option>
          <option value="married">נשוי/נשואה</option>
          <option value="single">גרוש/ה</option>
        </select>
        <input type="submit" value="שלח" />
      </form>
      {!loading && error && <p className="error">{error}</p>}
      {!loading && success && <p className="success">{success}</p>}
      {loading && <p className="loading">ממתין...</p>}
    </div>
  );
};

export default Register;
