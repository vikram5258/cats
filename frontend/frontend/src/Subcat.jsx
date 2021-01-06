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

  const [option, setOption] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const { option1, option2, option3, option4 } = option;

  useEffect(() => {
    if (loading) {
      async function fetch() {
        await axios
          .get(`http://localhost:5000/get-subCategories/${id}`)
          .then((res) => {
            setData(res.data.name);
            setOption(res.data.option);
          })
          .catch((error) => {
            console.log(error, "axios");
          });

        return () => {};
      }
      fetch();
      console.log(data, "data");
      setLoading(false);
    }
  }, [data, id, loading]);
  function handleChange(event) {
    setSub(event.target.value);
  }
  console.log(option, "data");

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
      {data.subcategories ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default Subcat;
