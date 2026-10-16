/** Form field name for the spam trap; deliberately meaningless to autofill. */
export const HONEYPOT_FIELD = "hp_x7q";

/**
 * Spam trap that bots fill but people never see. It is display:none with a
 * nonsense name and no label, because browser autofill and form-filler
 * extensions filled the previous visible-but-offscreen "website" field and
 * real inquiries were dropped as spam.
 */
export function HoneypotField() {
  return (
    <input
      type="text"
      name={HONEYPOT_FIELD}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      defaultValue=""
      style={{ display: "none" }}
    />
  );
}
