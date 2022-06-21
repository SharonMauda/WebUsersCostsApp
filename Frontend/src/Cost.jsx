import { set, useForm } from 'react-hook-form';
import { URL } from './utils';
import { useState } from 'react';
// The cost component is used to add a cost to the database.
const Cost = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);

  // The onSubmit function is called when the user submits the form.
  const onSubmit = async (data) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    // Send the data to the server.
    const response = await fetch(`${URL}/cost`, options);
    setLoading(false);
    // Check if response is ok
    if (response.ok) {
      setError(undefined);
      // Set success message.
      setSuccess('ההוצאה נרשמה בהצלחה');
    } else {
      // Set error as the response's body
      const error = await response.text();
      setSuccess(undefined);
      setError(error);
    }
  };
  return (
    <div dir="rtl">
      <h2>הכנסת הוצאה</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>תעודת זהות: </label>
        <input {...register('created_by')} />
        <label>קטגוריה: </label>
        <input {...register('category')} />
        <label>סכום: </label>
        <input {...register('sum')} type="number" />
        <label>תיאור: </label>
        <textarea {...register('description')}></textarea>
        <input type="submit" value="שלח" />
      </form>
      {!loading && error && <p className="error">{error}</p>}
      {!loading && success && <p className="success">{success}</p>}
      {loading && <p className="loading">ממתין...</p>}
    </div>
  );
};

export default Cost;
