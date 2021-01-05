import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Subcat() {
  const location = useLocation();
  const [add, setAdd] = useState(false);
  const [data, setData] = useState({});
  const id = location.pathname.split(":")[1];
  const [sub, setSub] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      async function fetch() {
        await axios
          .get(`http://localhost:5000/get-subCategories/${id}`)
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.log(error, "axios");
          });
        return () => {};
      }
      fetch();
      setLoading(false);
    }
  }, [id, loading]);
  function handleChange(event) {
    setSub(event.target.value);
  }

  async function handleSave() {
    //update-subCategories
    console.log(sub, "sub save");

    await axios
      .post(`http://localhost:5000/update-subCategories/${id}`, { sub: sub })
      .then((res) => {
        setLoading(true);
        setAdd(!add);
      })
      .catch((error) => {});
  }

  return (
    <div>
      <div className="add_sub">
        <button onClick={() => setAdd(!add)}>add sub</button>
        {add ? (
          <div className="div">
            <label htmlFor="sub"> add sub category </label>
            <input type="text" name="sub" onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : null}
      </div>
      {data.subcategories ? (
        <table>
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {data.subcategories.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Subcat;
