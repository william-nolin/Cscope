import { MetricsProps } from "model/MetricsProps";

const BuddleGraphMetrics: React.FC<MetricsProps> = ({
  commitCount,
  codeSize,
  mainAuthor,
  modifiedDate,
}) => {
  return (
    <div className="metrics">
      <div className="metrics__header">Metrics</div>
      <div className="metrics__item">
        <span className="metrics__label">Commit</span>
        <span className="metrics__value">{commitCount} commits</span>
      </div>
      <div className="metrics__item">
        <span className="metrics__label">Size</span>
        <span className="metrics__value">{codeSize} Lines of Code</span>
      </div>
      <div className="metrics__item">
        <span className="metrics__label">Main Author</span>
        <span className="metrics__value">{mainAuthor}</span>
      </div>
      <div className="metrics__item">
        <span className="metrics__label">Modified</span>
        <span className="metrics__value">{modifiedDate}</span>
      </div>
    </div>
  );
};

export default BuddleGraphMetrics;
