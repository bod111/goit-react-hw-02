import { useEffect, useState } from "react";

import "./App.css";
import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

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

  const updateFeedback = (feedbackType) => {
    setFeedbackCollection(() => {
      return {
        ...feedbackCollection,
        [feedbackType]: feedbackCollection[feedbackType] + 1,
      };
    });
    // setFeedbackCollection({
    //   ...feedbackCollection,
    //   [feedbackType]: feedbackCollection[feedbackType] + 1,
    // });
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

  const totalFeedbackResult = countTotalFeedback();
  const positiveFeedbackResult = handlePositiveFeedback();

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
          totalFeedback={totalFeedbackResult}
          positiveFeedback={positiveFeedbackResult}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
