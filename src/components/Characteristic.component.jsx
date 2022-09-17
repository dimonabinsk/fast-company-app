const Characteristic = ({ color, name }) => {
  return (
    <>
      <span className={`badge  bg-${color} me-1`}>{name}</span>
    </>
  );
};

export default Characteristic;
