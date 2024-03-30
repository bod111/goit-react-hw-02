import css from "./Feedback.module.css";

export default function Feedback({
  feedbackCollection,
  totalFeedback,
  positiveFeedback,
}) {
  const { good, neutral, bad } = feedbackCollection;
  return (
    <div className={css.container}>
      <p>Goog: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positiveFeedback}%</p>
    </div>
  );
}
