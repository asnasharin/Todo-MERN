import "./CheckBox.css";
export default function CheckBox({ checked }: { checked: boolean }) {
  return (
    <>
      <label className="container--0">
        <input checked={checked} type="checkbox" />
        <div className="checkmark"></div>
      </label>
    </>
  );
}
