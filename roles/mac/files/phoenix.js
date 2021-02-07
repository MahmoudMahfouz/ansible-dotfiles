const MOD = ['ctrl', 'alt', 'cmd'];
const MOD_S = [...MOD, 'shift'];
let VERBOSE = false;
const HALF_CORRECTION = 6; // Fix padding issues for half screen windows

var scr = Screen.main().flippedVisibleFrame();
// Padding Values
// var paddingTop = 35;
// var paddingLeft = 15;
// var paddingRight = 30;
// var paddingBottom = 25;
// var paddingCenter = 10;
// var paddingMiddle = 20;

var paddingTop = 0;
var paddingLeft = 0;
var paddingRight = 0;
var paddingBottom = 0;
var paddingCenter = 0;
var paddingMiddle = 0;
// Computed sizes
var halfWidth = ((scr.width - paddingLeft) - paddingRight) / 2;
var halfHeight = (((scr.height - paddingTop) - paddingBottom) / 2) + HALF_CORRECTION;

var thirdWidth = ((scr.width - paddingLeft) - paddingRight) / 3;

var windowLocations = {
    full: {
        y: paddingTop,
        x: paddingLeft,
        width: scr.width - paddingRight,
        height: scr.height - paddingBottom
    },
    left: {
        y: paddingTop,
        x: paddingLeft,
        width: halfWidth - paddingCenter,
        height: scr.height - paddingBottom
    },
    right: {
        y: paddingTop,
        x: (halfWidth + paddingLeft) + paddingCenter,
        width: halfWidth,
        height: scr.height - paddingBottom
    },
    //Corners
    topRight: {
        y: paddingTop,
        x: (halfWidth + paddingLeft) + paddingCenter,
        width: halfWidth,
        height: halfHeight
    },
    bottomRight: {
        y: (halfHeight + paddingTop) + paddingMiddle,
        x: (halfWidth + paddingLeft) + paddingCenter,
        width: halfWidth,
        height: halfHeight
    },
    topLeft: {
        y: paddingTop,
        x: paddingLeft,
        width: halfWidth - paddingCenter,
        height: halfHeight
    },
    bottomLeft: {
        y: (halfHeight + paddingTop) + paddingMiddle,
        x: paddingLeft,
        width: halfWidth - paddingCenter,
        height: halfHeight
    },
    // // Extra sizes
    // rightTwoThirds: {
    //     y: paddingTop,
    //     x: (thirdWidth + paddingLeft) + paddingCenter,
    //     width: thirdWidth * 2,
    //     height: scr.height - paddingBottom
    // },
    // leftTwoThirds: {
    //     y: paddingTop,
    //     x: paddingLeft,
    //     width: (thirdWidth * 2) - paddingCenter,
    //     height: scr.height - paddingBottom
    // },
    // leftThird: {
    //     y: paddingTop,
    //     x: paddingLeft,
    //     width: thirdWidth - paddingCenter,
    //     height: scr.height - paddingBottom
    // },
    // rightThird: {
    //     y: paddingTop,
    //     x: ((thirdWidth * 2) + paddingLeft) + paddingCenter,
    //     width: thirdWidth,
    //     height: scr.height - paddingBottom
    // }
}


let movementModal = (message, override = false) => {
  window = Window.focused();
  screen = Screen.main().flippedVisibleFrame();

  Modal.build({
      origin(modal) {
          return {
              x: (screen.width / 2) - (modal.width / 2),
              y: (screen.height / 2)
          }
      },
      weight: 20,
      duration: 1,
      appearance: 'dark',
      icon: window.app().icon(),
      text: override ? message + ' ' + window.app().name() : 'Moving ' + window.app().name() + ' to the ' + message
  }).show();
}

// Move focused window to left or right half
var leftHalf = new Key('j', MOD, () => {
  if (VERBOSE) { movementModal('left half'); }
  Window.focused().setFrame(windowLocations.left);
});

var rightHalf = new Key('k', MOD, () => {
  if (VERBOSE) { movementModal('right half'); }
  Window.focused().setFrame(windowLocations.right);
});

// var rightTwoThirds = new Key('l', MOD, () => {
//   if (VERBOSE) { movementModal('right two-thirds'); }
//   Window.focused().setFrame(windowLocations.rightTwoThirds);
// });

// var leftTwoThirds = new Key('y', MOD, () => {
//   if (VERBOSE) { movementModal('left two-thirds'); }
//   Window.focused().setFrame(windowLocations.leftTwoThirds);
// });

// var leftThird = new Key('h', MOD, () => {
//   if (VERBOSE) { movementModal('left third'); }
//   Window.focused().setFrame(windowLocations.leftThird);
// });

// var rightThird = new Key('o', MOD, () => {
//   if (VERBOSE) { movementModal('right third'); }
//   Window.focused().setFrame(windowLocations.rightThird);
// });

// Move focused window to corners
var topRight = new Key('w', MOD, () => {
  if (VERBOSE) { movementModal('top right'); }
  Window.focused().setFrame(windowLocations.topRight);
});

var topLeft = new Key('q', MOD, () => {
  if (VERBOSE) { movementModal('top left'); }
  Window.focused().setFrame(windowLocations.topLeft);
});

var bottomRight = new Key('s', MOD, () => {
  if (VERBOSE) { movementModal('bottom right'); }
  Window.focused().setFrame(windowLocations.bottomRight);
});

var bottomLeft = new Key('a', MOD, () => {
  if (VERBOSE) { movementModal('bottom left'); }
  Window.focused().setFrame(windowLocations.bottomLeft);
});

// Maximize window (not fullscreen)
var maximizeWindow = new Key('m', MOD, () => {
  if (VERBOSE) { movementModal('Maximizing', true); }
  Window.focused().setFrame(windowLocations.full); //.maximize();
});

// Minimize window
let minimizeWindow = new Key('n', MOD, () => {
  if (VERBOSE) { movementModal('Minimizing', true); }
  Window.focused().minimize();
});

let fullscreenWindow = new Key('f', MOD, () => {
  let w = Window.focused();
  if (w.isFullScreen()) {
      Window.focused().setFullScreen(false);
  } else {
      Window.focused().setFullScreen(true);
  }
});




let focus = (direction) => {
  let window;
  if (Window.focused() === undefined) {
      window = Window.recent()[0];
  } else {
      window = Window.focused();
  }

  let neighbors = window.neighbors(direction);

  if (neighbors === undefined || neighbors.length > 0) {
      let index = 0;

      while (index < neighbors.length) {
          if (neighbors[index] === undefined) { return; }

          if (!neighbors[index].isVisible()) {
              index++;
          } else { break; }
      }

      if (neighbors[index] === undefined) { return; }

      neighbors[index].focus();
  }
}

// Get focus on window in direction
var focusEast = new Key('d', MOD_S, () => {
  focus('east');
});

var focusNorth = new Key('w', MOD_S, () => {
  focus('north');
});

var focusWest = new Key('a', MOD_S, () => {
  focus('west');
});

var focusSouth = new Key('s', MOD_S, () => {
  focus('south');
});

let startFocus = new Key('z', MOD, () => {
  if (Window.focused() === undefined || !Window.focused().isVisible()) {
      if (Window.recent().length > 0) {
          newWindow = Window.recent()[0];
          newWindow.focus();
      } else {
          screen = Screen.main().flippedVisibleFrame();
          Modal.build({
              origin(modal) {
                  return {
                      x: (screen.width / 2) - (modal.width / 2),
                      y: (screen.height / 2)
                  }
              },
              weight: 20,
              duration: 1,
              appearance: 'dark',
              text: 'No windows available'
          }).show();
      }
  }
})

let info = new Key('i', MOD, () => {
  const windows = Space.active().windows();

  for (window of windows) {

      if (window.isVisible()) {

          windowFrame = window.frame();
          screen = Screen.main().flippedVisibleFrame();

          Modal.build({
              origin(modal) {
                  return {
                      x: windowFrame.x + (windowFrame.width / 2) - (modal.width / 2),
                      y: (screen.height - windowFrame.y) - (windowFrame.height / 2)
                  }
              },
              weight: 16,
              duration: 2,
              appearance: 'dark',
              icon: window.app().icon(),
              text: window.app().name()
          }).show();
      }
  }
});

let verbose = new Key('v', MOD, () => {
  VERBOSE = !VERBOSE;
})





Phoenix.set ({
  openAtLogin: true
});
