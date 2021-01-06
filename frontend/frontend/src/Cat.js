import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cat() {
  const [cat, setCat] = useState(false);
  const [categories, setCategories] = useState({ name: "", status: "active" });
  const [option, setOption] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const [data, setData] = useState([]);
  const { option1, option2, option3, option4 } = option;
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
    const data = { ...categories, option };
    axios
      .post("http://localhost:5000/create-categories", data)
      .then((res) => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("axios", data);
    setCat(!cat);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setCategories((categories) => ({
      ...categories,
      [name]: value,
    }));
    setLoading(true);
  }
  function handleCheck(event) {
    console.log("hi");
    console.log(event.target, "target");
    const { name, checked } = event.target;

    setOption((option) => ({
      ...option,
      [name]: checked,
    }));
    console.log(data, "data");
  }
  return (
    <div>
      <div className="add_cat">
        <button onClick={handleButton}>add cat</button>
        {cat ? (
          <div className="cat">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="" onChange={handleChange} />
              <label htmlFor="status"> status </label>
              <input type="text" name="status" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="option1"> Option 1</label>
              {"      "}
              <input
                type="checkbox"
                name="option1"
                value={option1}
                onChange={handleCheck}
                id=""
              />
            </div>
            <div>
              <label htmlFor="option2"> Option 2</label>
              {"      "}
              <input
                type="checkbox"
                name="option2"
                value={option2}
                onChange={handleCheck}
                id=""
              />
            </div>
            <div>
              <label htmlFor="option3"> Option 3</label>
              {"      "}
              <input
                type="checkbox"
                name="option3"
                value={option3}
                onChange={handleCheck}
                id=""
              />
            </div>
            <div>
              <label htmlFor="option4"> Option 4</label>
              {"      "}
              <input
                type="checkbox"
                name="option4"
                value={option4}
                onChange={handleCheck}
                id=""
              />
            </div>
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
                      <button> edit </button>
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
