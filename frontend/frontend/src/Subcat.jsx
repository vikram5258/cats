import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Subcat() {
  const location = useLocation();
  const [add, setAdd] = useState(false);
  const [data, setData] = useState({});
  const id = location.pathname.split(":")[1];
  const [sub, setSub] = useState("");
  useEffect(() => {
    const get = `http://localhost:5000/get-subCategories/${id}`;
    axios
      .get(get)
      .then((res) => {
        setData(res.data);
        console.log(data.subcategories, "setdata");
      })
      .catch((error) => {
        console.log(error, "axios");
      });
    return () => {};
  }, []);
  function handleChange(event) {
    setSub(event.target.value);
  }
  function handleSave() {
    //update-subCategories
    console.log(sub, "sub save");

    axios
      .post(`http://localhost:5000/update-subCategories/${id}`, { sub: sub })
      .then((res) => {})
      .catch((error) => {});
  }
  return (
    <div>
      <div className="add_sub">
        <button onClick={() => setAdd(!add)}>add sub</button>
        {add ? (
          <div className="div">
            {" "}
            <label htmlFor="sub"> add sub category </label>
            <input type="text" name="sub" onChange={handleChange} id="" />
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
