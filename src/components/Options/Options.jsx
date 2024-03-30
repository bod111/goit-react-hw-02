import css from "./Options.module.css";

export default function Options({
  updateFeedback,
  feedbacks,
  reset,
  totalFeedback,
}) {
  return (
    <div className={css.btnBlock}>
      {feedbacks.map((feedback) => (
        <button
          className={css.btn}
          key={feedback}
          type="button"
          name={feedback}
          onClick={updateFeedback}
        >
          {feedback[0].toUpperCase() + feedback.slice(1)}
        </button>
      ))}
      {totalFeedback > 0 && (
        <button className={css.btn} type="button" onClick={reset}>
          Reset
        </button>
      )}
    </div>
  );
}
