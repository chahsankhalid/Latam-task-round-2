import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import CountryData from "./Countrydata.json";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import BarChart from "react-bar-chart";
import { PieChart } from "react-minimal-pie-chart";
import $ from 'jquery'

export default function User() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const [csvdata, setCsvdata] = useState("");

  const graphdata = [
    { text: "1", value: 5 },
    { text: "2", value: 10 },
    { text: "3", value: 15 },
    { text: "4", value: 20 },
    { text: "5", value: 25 },
    { text: "6", value: 30 },
    { text: "7", value: 35 },
    { text: "8", value: 40 },
    { text: "9", value: 45 },
    { text: "10", value: 50 },
  ];

  const graphmargin = { top: 20, right: 1, bottom: 30, left: 1 };
  const graphpadding = { top: 0, right: 20, bottom: 0, left: 20 };
  const onSubmit = (data) => {
    console.log(data);
    setFormData(data);
  };

  // -------------form data---------------
  const [name, setName] = useState("");
  const [fullname, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [fullemail, setFullEmail] = useState("");
  // ------------form data----------------

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState(CountryData);

  const [searchCountry, setSearchCountry] = useState();

  const [city, setCity] = useState();
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
        setCsvdata(text);
      };

      fileReader.readAsText(file);
    }
  };
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const arrays = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(arrays);
  };

  const capital = countries.find((obj) => {
    if (obj.country === searchCountry) {
      return true;
    }
    return false;
  });

  const validateFileType = () => {
    var fileName = document.getElementById("csvFileInput").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    console.log(extFile);
    if (extFile === "csv") {
      //TO DO
    } else {
      alert("Only csv files are allowed!");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const inputEvent = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const inputEvent2 = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const openOutput = () => {

  }
  $('.ant-tabs-tab').removeClass('ant-tabs-tab-disabled')
  return (
    <>
      <section id="headertop">
        <div className="avatarlogin">
          <div className="container-fluid headerrow">
            <div className="row">
              <div className="col-md-4 textleft">
                <img
                  src={"./images/Logo.svg"}
                  className="logomain"
                  alt="logo"
                />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4 textright">
                <div className="dropdownuser">
                  <div className="userdiv" onClick={() => setOpen(!open)}>
                    <span>{state.name.substring(0, 1)}</span>
                  </div>
                  {open && (
                    <div className="dropdownitems">
                      <ul>
                        <li>
                          <div className="userdiv userfirst">
                            {state.name.substring(0, 1)}
                          </div>
                        </li>
                        <li>
                          <b>{state.name}</b>
                        </li>
                        <li> {state.email}</li>
                        <li>
                          <button
                            className="btn btn-outline-dark logoutbtn"
                            onClickCapture={logout}
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Tabs>
            <Tabs.TabPane tab="Input" key="input">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <h4 className="userheading">User</h4>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="input-area">
                        <input
                          {...register("name")}
                          type="name"
                          className="form-control"
                          onChange={inputEvent}
                          value={name}
                          required
                        />
                        <label className="" for="">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-area">
                        <select
                          {...register("gender")}
                          className="form-select"
                          aria-label="Default select example"
                          onChange={inputEvent2}
                          required
                        >
                          <option selected>--Please Select--</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="unspecified">Unspecified</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-area">
                        <input
                          {...register("age")}
                          type="number"
                          onInput="this.value|=0"
                          className="form-control"
                          required
                        />
                        <label className="" for="">
                          Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="input-area">
                        <input
                          {...register("email")}
                          type="email"
                          className="form-control"
                          required
                        />
                        <label className="" for="">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="input-area">
                        <select
                          {...register("country")}
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                          className="form-control"
                          required
                        >
                          <option value="" hidden>
                            --Select Country--
                          </option>
                          {countries.map((item) => {
                            return (
                              <option key={uuidv4()} value={item.country}>
                                {item.country}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <select
                          {...register("capital")}
                          onChange={(e) => setCity(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                          required
                        >
                          <option value="" hidden>
                            --Select City--
                          </option>
                          <option value={(capital && capital.city) || ""}>
                            {(capital && capital.city) || ""}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                        required
                      />

                      <button
                        className="btn btn-primary continue"
                        onClick={(e) => {
                          handleOnSubmit(e);openOutput()
                        }}
                      >
                        Import CSV
                      </button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12 mt-3">
                      <div className="input-area">
                        <textarea
                          rows="5"
                          {...register("csv")}
                          className="form-control"
                          value={csvdata}
                        >
                          {/* {array.map((item) => (
                            <tr key={item.id}>
                              {Object.values(item).map((val) => (
                                <td>{val}</td>
                              ))}
                            </tr>
                          ))} */}
                          {csvdata}
                        </textarea>
                        <label className="" for="">
                          Manual CSV Data Input
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary continue">
                    Continue
                  </button>
                </div>
              </form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Output" key="output" disabled={false}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">Name:</span>{" "}
                      <span className="outputdata">{formData.name}</span>
                    </div>
                  </div>
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">Email: </span>{" "}
                      <span className="outputdata">{formData.email}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">Gender:</span>{" "}
                      <span className="outputdata"> {formData.gender}</span>
                    </div>
                  </div>
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">Age:</span>{" "}
                      <span className="outputdata"> {formData.age}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">Country:</span>{" "}
                      <span className="outputdata"> {formData.country}</span>
                    </div>
                  </div>
                  <div className="col-md-6 outputdivs">
                    <div className="outputfield">
                      <span className="outputlabel">City: </span>{" "}
                      <span className="outputdata">{formData.capital}</span>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-6">
                    {" "}
                    <div className="graphparent">
                    <BarChart
                      ylabel="Price"
                      xlabel="Product"
                      width={500}
                      height={500}
                      margin={graphmargin}
                      padding={graphpadding}
                      data={graphdata}
                    />
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="graphparent">
                    <PieChart
                      data={[
                        { title: "One", value: 2, color: "#E38627" },
                        { title: "Two", value: 5, color: "#C13C37" },
                        { title: "Three", value: 7, color: "#6A2135" },
                        { title: "Four", value: 9, color: "#eab676" },
                        { title: "Five", value: 15, color: "#063970" },
                        { title: "Six", value: 13, color: "#abdbe3" },
                        { title: "Seven", value: 11, color: "#80391e" },
                        { title: "Eight", value: 20, color: "#1c100b" },
                        { title: "Nine", value: 23, color: "#e07b39" },
                        { title: "Ten", value: 3, color: "#cce7e8" },
                      ]}
                    />
                    </div>
                    ;
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </section>
      {/* <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{state.id}</th>
              <td>{state.name}</td>
              <td>{state.email}</td>
              <td>{state.phone}</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
}
