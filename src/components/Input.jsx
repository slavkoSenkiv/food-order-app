export default function Input({ label, placeholder, error, ...props}) {
  return (
    <div className='control-row'>
      <label>{label}</label>
      <input placeholder={placeholder} {...props} />
      <div>{error}</div>
    </div>
  );
}
