import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactNO: "",
    paymentMethod: "Credit Card",
    trxID: "",
    numberUsed: "",
    courses: [],
  });
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/courses/data") // Fetch courses data
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "courses") {
      const selectedCourse = courses.find(
        (course) => course.id.toString() === value
      );
      const newCourses = formData.courses.some(
        (course) => course.id === selectedCourse.id
      )
        ? formData.courses.filter((course) => course.id !== selectedCourse.id)
        : [...formData.courses, selectedCourse];

      setFormData({ ...formData, courses: newCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure at least one course is selected
    if (formData.courses.length === 0) {
      const error = "Please select at least one course.";
      setErrorMessage(error);
      return;
    }

    const postData = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      contactNO: formData.contactNO,
      paymentMethod: formData.paymentMethod,
      NumberUsed: formData.numberUsed,
      TrxID: formData.trxID,
      selectedCourses: formData.courses.map((course) => ({
        course_id: course.id,
      })), // Convert to required format
    };

    // Log the data to be sent to the server
    console.log("Data to be sent:", postData);

    try {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      // Log the response from the server
      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        setSuccessMessage("Your Registration is Successful. Please wait for the confirmation.");
        setErrorMessage("");

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          contactNO: "",
          paymentMethod: "Credit Card",
          trxID: "",
          numberUsed: "",
          courses: [],
        });

        // Wait for 2 seconds before navigating to another page
        setTimeout(() => {
          navigate("/student/login");
        }, 5000);
      } else {
        setErrorMessage("Failed to register student. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to register student. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Student Registration</h1>
          <p className="py-6">
            Please fill in the details to register as a student.
          </p>
        </div>
        <div className="card  w-full max-w-2xl shadow-2xl">
          <form
            className="card-body grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">First Name</span>
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="input input-bordered"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Last Name</span>
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="input input-bordered"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Contact Number</span>
              </label>
              <input
                type="text"
                name="contactNO"
                placeholder="Contact Number"
                className="input input-bordered"
                value={formData.contactNO}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Account/Phone Number Used
                </span>
              </label>
              <input
                type="text"
                name="numberUsed"
                placeholder="Number Used"
                className="input input-bordered"
                value={formData.numberUsed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Payment Method</span>
              </label>
              <select
                name="paymentMethod"
                className="select select-bordered"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="bKash">bKash</option>
                <option value="Rocket">Rocket</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Nagad">Nagad</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Transaction ID</span>
              </label>
              <input
                type="text"
                name="trxID"
                placeholder="Transaction ID"
                className="input input-bordered"
                value={formData.trxID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-white">
                  Courses you are interested to enroll:
                </span>
              </label>
              <div className="flex flex-wrap mb-4">
                {courses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center mr-4 text-white"
                  >
                    <input
                      type="checkbox"
                      name="courses"
                      value={course.id}
                      checked={formData.courses.some((c) => c.id === course.id)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {course.title}
                    <br />
                  </label>
                ))}
              </div>
            </div>
            {successMessage && (
              <div className="text-green-500 text-center mb-4 md:col-span-2">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center mb-4 md:col-span-2">
                {errorMessage}
              </div>
            )}
            <div className="form-control mt-6 md:col-span-2">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
