import { useEffect, useState } from "react";

import "./App.css";
import Description from "./Component/Description/Description";
import Options from "./Component/Options/Options";
import Feedback from "./Component/Feedback/Feedback";
import Notification from "./Component/Notification/Notification";

function App() {
  const [feedbackCollection, setFeedbackCollection] = useState(() => {
    const savedObject = window.localStorage.getItem("feedbacks");
    if (!savedObject) {
      return {
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }
    return JSON.parse(savedObject);
  });

  const updateFeedback = ({ target }) => {
    const name = target.name;
    setFeedbackCollection({
      ...feedbackCollection,
      [name]: feedbackCollection[name] + 1,
    });
  };

  useEffect(() => {
    window.localStorage.setItem(
      "feedbacks",
      JSON.stringify(feedbackCollection)
    );
  }, [feedbackCollection]);

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackCollection;
    return good + neutral + bad;
  };

  const onResetFeedbacks = () => {
    setFeedbackCollection({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const handlePositiveFeedback = () => {
    const totalFeedback = countTotalFeedback();
    return Math.round((feedbackCollection.good / totalFeedback) * 100);
  };
  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        feedbacks={Object.keys(feedbackCollection)}
        reset={onResetFeedbacks}
        totalFeedback={countTotalFeedback()}
      />
      {countTotalFeedback() > 0 ? (
        <Feedback
          feedbackCollection={feedbackCollection}
          totalFeedback={countTotalFeedback()}
          positiveFeedback={handlePositiveFeedback()}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
