import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { URL } from './utils';

// The cost component is used to get a report from the database.
const Report = () => {
  const { register, handleSubmit } = useForm();
  const [results, setResults] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(undefined);
  // The onSubmit function is called when the user submits the form.
  const onSubmit = async (data) => {
    setLoading(true);
    // Send the data to the server.
    const resp = await fetch(
      `${URL}/report?id=${data.id}&month_start=${data.month_start}&month_end=${data.month_end}`
    );
    setLoading(false);
    // Check if response is ok
    if (resp.ok) {
      setError(undefined);
      const json = await resp.json();
      setResults(json);
      setSum(json.reduce((acc, cur) => acc + cur.sum, 0));
    } else {
      // Set error as the response's body
      setError(await resp.text());
    }
  };

  /**
   * Renders the report table.
   * @returns {JSX.Element} The report table.
   */
  const createTable = () => {
    // Check if the results are empty.
    if (results.length === 0) {
      return <p>אין הוצאות בחודש זה</p>;
    }
    // Calculate the sum of the results.

    // Create the table.
    const rows = results.map((res) => (
      <tr>
        <td>{res.description}</td>
        <td>{res.sum}</td>
        <td>{res.category}</td>
      </tr>
    ));
    return (
      <table>
        <tr>
          <th>תיאור</th>
          <th>סכום</th>
          <th>קטגוריה</th>
        </tr>
        {rows}
      </table>
    );
  };

  return (
    <div>
      <h2>דו"ח חודשי</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>תעודת זהות: </label>
        <input {...register('id')} />
        <label>חודש התחלה: </label>
        <input type="month" {...register('month_start')} />
        <label>חודש סוף: </label>
        <input type="month" {...register('month_end')} />
        <input type="submit" value="שלח" />
      </form>
      {!loading && error && <p className="error">{error}</p>}
      {!loading && results !== undefined && createTable()}
      {!loading && sum !== undefined && <p>סכום: {sum} ש"ח</p>}
      {/* Render the table if there are results. */}
      {loading && <p className="loading">ממתין...</p>}
    </div>
  );
};

export default Report;
