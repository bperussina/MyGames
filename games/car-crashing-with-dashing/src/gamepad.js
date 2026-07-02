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

/** Keyboard only — WASD to walk (computer controls, separate from Xbox). */
export function readKeyboardMove(input) {
  let mx = 0;
  let mz = 0;
  if (input.isPressed('w')) mz += 1;
  if (input.isPressed('s')) mz -= 1;
  if (input.isPressed('a')) mx -= 1;
  if (input.isPressed('d')) mx += 1;
  return { mx, mz };
}

/** Keyboard only — WASD to drive (computer controls, separate from Xbox). */
export function readKeyboardDriving(input) {
  let throttle = 0;
  let brake = 0;
  let steer = 0;
  if (input.isPressed('w')) throttle = 1;
  if (input.isPressed('s')) brake = 1;
  if (input.isPressed('a')) steer -= 1;
  if (input.isPressed('d')) steer += 1;
  steer = Math.max(-1, Math.min(1, steer));
  return { throttle, brake, steer };
}

/** Xbox driving: hold X = forward, B = brake, LB/LT/RB = turn (L/T/R). */
export function readDriving(pad) {
  let throttle = 0;
  let brake = 0;
  let steer = 0;

  if (!pad) return { throttle, brake, steer };

  if (pad.buttons[2]?.pressed) throttle = 1;

  if (pad.buttons[1]?.pressed) brake = 1;

  let turnLeft = 0;
  let turnRight = 0;
  if (pad.buttons[4]?.pressed) turnLeft = 1;
  const lt = pad.buttons[6]?.value ?? (pad.buttons[6]?.pressed ? 1 : 0);
  if (lt > 0.08) turnLeft = 1;
  if (pad.buttons[5]?.pressed) turnRight = 1;

  steer = turnRight - turnLeft;

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
