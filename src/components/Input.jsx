export default function Input({ label, placeholder }) {
  return (
    <div className='control-row'>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
}
