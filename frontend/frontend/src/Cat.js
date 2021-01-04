import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cat() {
  const [cat, setCat] = useState(false);
  const [categories, setCategories] = useState({ name: "", status: "active" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      async function fetch() {
        await axios
          .post("http://localhost:5000/get-categories")
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
  }, [data, loading]);

  function handleButton() {
    setCat(!cat);
  }
  function handleSave() {
    axios
      .post("http://localhost:5000/create-categories", categories)
      .then((res) => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("axios", categories);
    setCat(!cat);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCategories((categories) => ({
      ...categories,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="add_cat">
        <button onClick={handleButton}>add cat</button>
        {cat ? (
          <div className="cat">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="" onChange={handleChange} />
            <label htmlFor="status"> status </label>
            <input type="text" name="status" onChange={handleChange} />
            <button onClick={handleSave}>save</button>
          </div>
        ) : null}
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>status</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td> {item.name} </td>
                  <td> {item.status} </td>

                  <td>
                    <Link to={`/:${item._id}`}>
                      {" "}
                      <button> edit </button>{" "}
                    </Link>
                    {/* <button onClick={editCat}> add sub cat</button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cat;
