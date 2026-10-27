// Tech chips, used by the project cards and the Experience timeline
const Tags = ({ tags, className = "" }) => {
  return (
    <ul aria-label="Tech stack" className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded bg-accent-soft px-2 py-1.5 font-mono text-xs leading-none font-medium"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
