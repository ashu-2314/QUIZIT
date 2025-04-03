import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quizzes.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get("http://localhost:8080/api/quizzes");
    setQuizzes(response.data);
  };

  const createQuiz = async () => {
    await axios.post("http://localhost:8080/api/quizzes", quizData);
    fetchQuizzes();
  };

  const deleteQuiz = async (id) => {
    await axios.delete(`http://localhost:8080/api/quizzes/${id}`);
    fetchQuizzes();
  };

  return (
    <div className="admin-container">
      <h2>Manage Quizzes</h2>
      <div className="quiz-form">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizData.title}
          onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
        />
        <textarea
          placeholder="Quiz Description"
          value={quizData.description}
          onChange={(e) =>
            setQuizData({ ...quizData, description: e.target.value })
          }
        />
        <button onClick={createQuiz}>Create Quiz</button>
      </div>

      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
