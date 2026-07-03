/** On-screen D-pad for iPad / phones (no keyboard). */

function isTouchDevice() {
  return matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

const noop = () => ({ mx: 0, mz: 0 });
const noopDrive = () => ({ throttle: 0, brake: 0, reverse: 0, steer: 0 });

export function createTouchControls() {
  if (!isTouchDevice()) {
    return {
      readMove: noop,
      readDrive: noopDrive,
      setDriving: () => {},
      setVisible: () => {},
      onExit: () => {},
    };
  }

  const root = document.createElement('div');
  root.id = 'touch-pad';
  root.innerHTML = `
    <button type="button" class="touch-btn touch-up" data-mz="1" aria-label="Forward">▲</button>
    <button type="button" class="touch-btn touch-left" data-mx="-1" aria-label="Left">◀</button>
    <button type="button" class="touch-btn touch-right" data-mx="1" aria-label="Right">▶</button>
    <button type="button" class="touch-btn touch-down" data-mz="-1" aria-label="Back">▼</button>
    <button type="button" class="touch-btn touch-exit" id="touch-exit" hidden aria-label="Exit car">Exit</button>
  `;
  document.body.appendChild(root);

  const held = { mx: 0, mz: 0 };
  let drivingMode = false;
  const exitBtn = root.querySelector('#touch-exit');

  function bindBtn(btn) {
    const setFromBtn = (on) => {
      if (!on) {
        held.mx = 0;
        held.mz = 0;
        return;
      }
      if (drivingMode) {
        const mz = Number(btn.dataset.mz || 0);
        const mx = Number(btn.dataset.mx || 0);
        held.mz = mz;
        held.mx = mx;
      } else {
        held.mx = Number(btn.dataset.mx || 0);
        held.mz = Number(btn.dataset.mz || 0);
      }
    };

    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      setFromBtn(true);
    });
    btn.addEventListener('pointerup', () => setFromBtn(false));
    btn.addEventListener('pointercancel', () => setFromBtn(false));
  }

  root.querySelectorAll('.touch-btn[data-mx], .touch-btn[data-mz]').forEach(bindBtn);

  let onExit = null;
  exitBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    onExit?.();
  });

  return {
    readMove() {
      if (drivingMode) return { mx: 0, mz: 0 };
      return { ...held };
    },
    readDrive() {
      if (!drivingMode) return { throttle: 0, brake: 0, reverse: 0, steer: 0 };
      return {
        throttle: held.mz > 0 ? 1 : 0,
        reverse: held.mz < 0 ? 1 : 0,
        brake: 0,
        steer: held.mx,
      };
    },
    setDriving(on) {
      drivingMode = on;
      held.mx = 0;
      held.mz = 0;
      exitBtn.hidden = !on;
    },
    setVisible(on) {
      root.hidden = !on;
    },
    onExit(cb) {
      onExit = cb;
    },
  };
}
