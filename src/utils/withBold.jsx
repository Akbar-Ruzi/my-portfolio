// Turns **double asterisks** in data text into <strong> (used by experience.jsx).
// "a **b** c" → ["a ", <strong>b</strong>, " c"]: every odd piece after splitting on ** was inside the asterisks.
// text-fg keeps bold words dark even inside muted text.
const withBold = (text) =>
  text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    )
  );

export default withBold;
