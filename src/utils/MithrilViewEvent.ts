
/**
 * As part of the autoredraw system, Mithril checks the .redraw property of any
 * event whose handler is defined in a Mithril view function. If that value is
 * set and false, Mithril skips the automatic redraw after that event.
 *
 * @see https://mithril.js.org/autoredraw.html
 */
export interface MithrilViewEvent {
  /** Set to false to skip the normal redraw triggered after each event handler */
  redraw: boolean;
}
export default MithrilViewEvent;
