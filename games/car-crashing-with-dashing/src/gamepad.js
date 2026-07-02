const DEADZONE = 0.18;

export function getGamepad() {
  const pads = navigator.getGamepads?.() ?? [];
  return pads.find((p) => p?.connected) ?? null;
}

export function readMovement(pad) {
  let mx = 0;
  let mz = 0;

  if (pad) {
    const ax = pad.axes[0] ?? 0;
    const ay = pad.axes[1] ?? 0;
    if (Math.abs(ax) > DEADZONE) mx += ax;
    if (Math.abs(ay) > DEADZONE) mz -= ay;

    if (pad.buttons[14]?.pressed) mx -= 1;
    if (pad.buttons[15]?.pressed) mx += 1;
    if (pad.buttons[12]?.pressed) mz += 1;
    if (pad.buttons[13]?.pressed) mz -= 1;
  }

  return { mx, mz };
}

/** Xbox controls for driving — left stick, triggers, d-pad. */
export function readDriving(pad) {
  let throttle = 0;
  let brake = 0;
  let steer = 0;

  if (!pad) return { throttle, brake, steer };

  const ax = pad.axes[0] ?? 0;
  const ay = pad.axes[1] ?? 0;

  if (Math.abs(ax) > DEADZONE) steer = ax;
  if (ay < -DEADZONE) throttle = Math.min(1, -ay);
  if (ay > DEADZONE) brake = Math.min(1, ay);

  const rt = pad.buttons[7]?.value ?? (pad.buttons[7]?.pressed ? 1 : 0);
  const lt = pad.buttons[6]?.value ?? (pad.buttons[6]?.pressed ? 1 : 0);
  if (rt > 0.08) throttle = Math.max(throttle, rt);
  if (lt > 0.08) brake = Math.max(brake, lt);

  if (pad.buttons[12]?.pressed) throttle = 1;
  if (pad.buttons[13]?.pressed) brake = 1;
  if (pad.buttons[14]?.pressed) steer = -1;
  if (pad.buttons[15]?.pressed) steer = 1;

  return { throttle, brake, steer };
}

/** Standard Xbox-style indices (may vary by browser). */
export const BUTTON_IDS = [
  { id: 'a', label: 'A', index: 0 },
  { id: 'b', label: 'B', index: 1 },
  { id: 'x', label: 'X', index: 2 },
  { id: 'y', label: 'Y', index: 3 },
  { id: 'lb', label: 'LB', index: 4 },
  { id: 'rb', label: 'RB', index: 5 },
  { id: 'lt', label: 'LT', index: 6 },
  { id: 'rt', label: 'RT', index: 7 },
  { id: 'view', label: 'View', index: 8 },
  { id: 'menu', label: 'Menu', index: 9 },
  { id: 'ls', label: 'Left stick press', index: 10 },
  { id: 'rs', label: 'Right stick press', index: 11 },
  { id: 'dpadUp', label: 'D-pad Up', index: 12 },
  { id: 'dpadDown', label: 'D-pad Down', index: 13 },
  { id: 'dpadLeft', label: 'D-pad Left', index: 14 },
  { id: 'dpadRight', label: 'D-pad Right', index: 15 },
  { id: 'xbox', label: 'Xbox', index: 16 },
];

export function readPressedActions(pad, bindings, prevPressed = {}) {
  const fired = [];
  if (!pad) return { fired, prevPressed };

  const next = { ...prevPressed };
  for (const btn of BUTTON_IDS) {
    const pressed = Boolean(pad.buttons[btn.index]?.pressed);
    const was = prevPressed[btn.id] ?? false;
    next[btn.id] = pressed;
    if (pressed && !was) {
      const action = (bindings[btn.id] ?? '').trim();
      if (action) fired.push({ id: btn.id, action });
    }
  }
  return { fired, prevPressed: next };
}
