/** Campo invisible anti-spam. Si se rellena, la solicitud se descarta. */
export default function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        No rellenar
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
