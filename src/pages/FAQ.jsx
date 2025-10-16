import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Vertex for BCS?",
      answer:
        "Vertex for BCS is a leading coaching platform specializing in BCS preparation. We offer courses and resources to help students succeed in the Bangladesh Civil Service exams.",
    },
    {
      question: "How do I enroll in a course?",
      answer:
        "You can enroll in our courses by visiting the 'Courses' section on our website and selecting the course you're interested in. Follow the registration process to secure your spot.",
    },
    {
      question: "What courses does Vertex for BCS offer?",
      answer:
        "We offer a wide range of courses, including Bangla, English, Mathematics, General Knowledge, and more, all tailored to help you ace the BCS exams.",
    },
    {
      question: "Are the courses available online?",
      answer:
        "Yes, all our courses are available online, allowing you to access study materials, quizzes, and lectures at your convenience.",
    },
    {
      question: "How long do I have access to a course?",
      answer:
        "Once enrolled, you will have access to the course materials for the entire duration of the course, usually spanning several weeks depending on the subject.",
    },
    {
      question: "Can I access course materials after the course ends?",
      answer:
        "Yes, course materials are available even after the course ends, so you can revisit important lessons and quizzes.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, upon successfully completing a course, you will receive a certificate of completion that you can download and use to showcase your skills.",
    },
    {
      question: "How can I contact Vertex for BCS?",
      answer:
        "You can reach out to us via our Contact Us page or by emailing our support team at support@vertexforbcs.com.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments via credit/debit cards, mobile banking platforms like bKash, and other secure payment gateways.",
    },
    {
      question: "Can I get a refund if I'm not satisfied with a course?",
      answer:
        "Yes, we offer a refund policy within a specific time frame after the course begins. Please refer to our refund policy for detailed information.",
    },
    {
      question: "Are there any free resources available?",
      answer:
        "Yes, Vertex for BCS offers several free resources, including sample quizzes and study materials, to help you get started on your BCS preparation.",
    },
    {
      question: "How can I track my progress in a course?",
      answer:
        "You can track your progress through your student dashboard, where you can view completed lessons, quiz scores, and other course statistics.",
    },
    {
      question: "Can I take quizzes multiple times?",
      answer:
        "Yes, you can retake quizzes as many times as you want to improve your understanding and score.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions to set a new password.",
    },
    {
      question: "Can I change my course after enrolling?",
      answer:
        "Yes, you can switch to a different course within the first week of enrollment by contacting our support team.",
    },
    {
      question: "Is there any live support available?",
      answer:
        "Yes, we offer live chat support during business hours. You can also send us an email for assistance outside of these hours.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "We occasionally offer discounts and promotions. Stay updated by subscribing to our newsletter or following us on social media.",
    },
    {
      question: "What devices can I use to access the courses?",
      answer:
        "You can access our courses on any device with an internet connection, including desktops, laptops, tablets, and smartphones.",
    },
    {
      question: "Do I need any prior experience to enroll in a course?",
      answer:
        "No prior experience is required to enroll in most of our courses. We offer courses for beginners as well as advanced learners.",
    },
    {
      question: "How are the courses structured?",
      answer:
        "Our courses are structured into modules, each containing video lessons, reading materials, quizzes, and assessments to ensure comprehensive learning.",
    },
  ];

  return (
    <div className="faq-container p-6 text-gray-200 px-[10%]">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item mb-4">
            <div
              className="cursor-pointer bg-gray-800 p-4 rounded-md shadow-md"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span>{activeIndex === index ? "-" : "+"}</span>
              </h2>
            </div>
            {activeIndex === index && (
              <div className="bg-gray-900 p-4 rounded-md mt-2">
                <p className="text-gray-300 indent-16">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
