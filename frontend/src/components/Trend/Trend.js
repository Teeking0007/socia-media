import "./Trend.css";

const Trend = ({trend}) => {
  return (
    <div  className="trend">
      <span>{trend.name}</span>
      <span>{trend.shares}</span>
    </div>
  );
};

export default Trend;
