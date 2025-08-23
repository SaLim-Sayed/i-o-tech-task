 "use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AppointmentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  date: Yup.date().required("Date is required"),
  message: Yup.string(),
});

export default function Page() {
  return (
    <div className="space-y-10 container mx-auto px-4 sm:px-8 lg:px-16 pt-28">
  
       <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            date: "",
            message: "",
          }}
          validationSchema={AppointmentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Form Submitted:", values);
            alert("Appointment request submitted!");
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Appointment Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Message (optional)</label>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Book Appointment"}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
