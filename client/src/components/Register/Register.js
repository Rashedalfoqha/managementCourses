import React, { useState, useEffect } from "react";

const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("");
  const [country, setCountry] = useState("");

  const countryArray = [
    "United States",
    "Canada",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and/or Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Croatia (Hrvatska)",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecudaor",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "France, Metropolitan",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard and Mc Donald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfork Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Helena",
    "St. Pierre and Miquelon",
    "Sudan",
    "Suriname",
    "Svalbarn and Jan Mayen Islands",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States minor outlying islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City State",
    "Venezuela",
    "Vietnam",
    "Virigan Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Yemen",
    "Yugoslavia",
    "Zaire",
    "Zambia",
    "Zimbabwe"
  ];
  const registerHandle=()=>{
    
  }
  return (
    <>
      <div className="font-[sans-serif] bg-white text-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>
          <div className="flex items-center md:p-8 p-6 bg-[#c2c2c2] h-full lg:w-11/12 lg:ml-auto">
            <form className="max-w-lg w-full mx-auto">
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-gray-950">
                  Create an account
                </h3>
              </div>
              <div>
                <label className="text-xs block mb-2">First Name</label>
                <div className="relative flex items-center">
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-transparent text-sm border-b border-slate-950 focus:border-black px-2 py-3 outline-none"
                    placeholder="Enter first name"
                    onChange={(e) => {
                      setFirst(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Last Name</label>
                <div className="relative flex items-center">
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full bg-transparent text-sm border-b border-slate-950 focus:border-black px-2 py-3 outline-none"
                    placeholder="Enter last name"
                    onChange={(e) => {
                      setLast(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent text-sm border-b border-neutral-950 focus:border-stone-950 px-2 py-3 outline-none"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent text-sm border-b border-neutral-950 focus:border-stone-950 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Age</label>
                <div className="relative flex items-center">
                  <input
                    name="lastName"
                    type="date"
                    required
                    className="w-full bg-transparent text-sm border-b border-slate-950 focus:border-black px-2 py-3 outline-none"
                    placeholder="Enter birthday"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Role</label>
                <div className="relative flex items-center">
                  <select
                    name="role"
                    required
                    className="w-full bg-transparent text-sm border-b border-neutral-950 focus:border-stone-950 px-2 py-3 outline-none"
                    onChange={(e) => {
                      setUserType(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select your role
                    </option>
                    <option value="teacher" className="bg-indigo-400">
                      Teacher
                    </option>
                    <option value="student" className="bg-indigo-400">
                      Student
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Country</label>
                <div className="relative flex items-center">
                  <select
                    name="country"
                    required
                    className="w-full bg-transparent text-sm border-b border-neutral-950 focus:border-stone-950 px-2 py-3 outline-none"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select your country
                    </option>
                    {countryArray.map((elem, ind) => {
                      return (
                        <>
                          <option
                            key={ind}
                            value={elem}
                            className="bg-indigo-400"
                          >
                            {elem}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-10 flex items-start"></div>
              <div className="mt-0">
                <button
                  type="submit"
                  className="w-max shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md bg-transparent text-stone-950 border-stone-950 focus:outline-none"
                >
                  Register
                </button>
                <p className="text-sm mt-8">
                  Already have an account?{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-stone-950 font-semibold hover:underline ml-1"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
