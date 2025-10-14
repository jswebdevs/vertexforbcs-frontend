import { useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [role, setRole] = useState("seller"); // seller or buyer
  const [propertyType, setPropertyType] = useState("land"); // land, flat, house
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { role, propertyType, ...formData };

    try {
      const res = await fetch(
        "https://rajproperty-backend-1.onrender.com/api/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      Swal.fire({
        icon: data.success ? "success" : "error",
        title: data.success ? "Message Sent!" : "Oops...",
        text: data.success
          ? "Your message has been submitted successfully."
          : data.message || "Something went wrong.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      if (data.success) {
        setFormData({});
        setRole("");
        setPropertyType("");
        setTimeout(() => (window.location.href = "/properties"), 2000);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const buttonVariants = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 max-w-3xl mx-auto rounded-xl shadow-xl text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Connect with Us</h2>

      {/* Role Selection */}
      <motion.div className="mb-6 flex gap-4">
        {["seller", "buyer"].map((r) => (
          <motion.button
            key={r}
            type="button"
            onClick={() => {
              setRole(r);
              setPropertyType("");
              setFormData({});
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              role === r
                ? "bg-gradient-to-r from-green-400 to-green-600 text-white border border-green-600"
                : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Property Type */}
      <AnimatePresence>
        {role && (
          <motion.div
            key="propertyType"
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mb-6 flex gap-4"
          >
            {["land", "flat", "house"].map((type) => (
              <motion.button
                key={type}
                type="button"
                onClick={() => {
                  setPropertyType(type);
                  setFormData({});
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  propertyType === type
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white border border-green-600"
                    : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Form */}
      <AnimatePresence>
        {role && propertyType && (
          <motion.form
            key="contactForm"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Common Fields */}
            {["name", "phone", "email", "notes"].map((f) => (
              <motion.input
                key={f}
                type={f === "email" ? "email" : "text"}
                name={f}
                placeholder={
                  f === "notes"
                    ? "Additional Notes"
                    : f.charAt(0).toUpperCase() + f.slice(1)
                }
                value={formData[f] || ""}
                onChange={handleChange}
                required={f !== "email" && f !== "notes"}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
              />
            ))}

            {/* ---------------- SELLER ---------------- */}
            {role === "seller" && propertyType === "land" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="landKatha"
                    placeholder="Land Size (Katha)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="landChatak"
                    placeholder="Land Size (Chatak)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <select
                  name="landType"
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Land Type</option>
                  <option value="plot">Plot</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                  <option value="pond">Pond</option>
                  <option value="others">Others</option>
                </select>
                <input
                  type="text"
                  name="price"
                  placeholder="Asking Price"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {role === "seller" && propertyType === "flat" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="size"
                  placeholder="Flat Size (sqft)"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="bed"
                    placeholder="Bed"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="bath"
                    placeholder="Bath"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="balcony"
                    placeholder="Balcony"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    name="drawing"
                    onChange={handleChange}
                    className="select select-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  >
                    <option value="">Drawing Room?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    name="dining"
                    onChange={handleChange}
                    className="select select-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  >
                    <option value="">Dining Room?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <select
                  name="condition"
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
                <input
                  type="text"
                  name="price"
                  placeholder="Asking Price"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {role === "seller" && propertyType === "house" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="landSize"
                    placeholder="Land Size (katha)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="buildingSize"
                    placeholder="Building Size (sqft)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="foundation"
                  placeholder="Foundation"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="floors"
                  placeholder="Floors"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="unitsPerFloor"
                  placeholder="Units per Floor"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Asking Price"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {/* ---------------- BUYER ---------------- */}
            {role === "buyer" && propertyType === "land" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="expectedLocation"
                  placeholder="Expected Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minSize"
                    placeholder="Min Size"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="maxSize"
                    placeholder="Max Size"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <select
                  name="landType"
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Land Type</option>
                  <option value="plot">Plot</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                  <option value="pond">Pond</option>
                  <option value="others">Others</option>
                </select>
                <input
                  type="text"
                  name="budget"
                  placeholder="Maximum Budget"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {/* Buyer Flat */}
            {role === "buyer" && propertyType === "flat" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Preferred Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="number"
                  name="minSize"
                  placeholder="Minimum Size (sqft)"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="bedroomMin"
                    placeholder="Min Bedroom"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="bathroomMin"
                    placeholder="Min Bathroom"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="balconyMin"
                    placeholder="Min Balcony"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <select
                    name="drawing"
                    onChange={handleChange}
                    className="select select-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  >
                    <option value="">Drawing?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    name="dining"
                    onChange={handleChange}
                    className="select select-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  >
                    <option value="">Dining?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <select
                  name="condition"
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
                <input
                  type="text"
                  name="budget"
                  placeholder="Maximum Budget"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {/* Buyer House */}
            {role === "buyer" && propertyType === "house" && (
              <motion.div
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Preferred Location"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="landSize"
                    placeholder="Land Size (katha)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="buildingSize"
                    placeholder="Building Size (sqft)"
                    onChange={handleChange}
                    className="input input-bordered flex-1 bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="foundation"
                  placeholder="Foundation"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="floorsCompleted"
                  placeholder="Floors Completed"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="budget"
                  placeholder="Maximum Budget"
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-800 text-white border-gray-600 focus:ring-1 focus:ring-green-400 focus:outline-none"
                />
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn btn-accent w-full bg-gradient-to-r from-green-400 to-green-600 text-white border-none mt-4"
            >
              Submit
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;
