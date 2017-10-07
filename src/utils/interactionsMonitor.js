const DEFAULT_TIME = 5000; // 5 seconds

const EVENTS = {
  move: ['mousemove', 'touchmove'],
  start: ['touchstart', 'mousedown'],
  stop: ['touchend', 'mouseup'],
};

const ALL_EVENTS = [...EVENTS.move, ...EVENTS.start, ...EVENTS.stop];

const addEvents = element => (events, callback) =>
  events.forEach(event => element.addEventListener(event, callback));

export default ({
  element = window, onStart, onMove, onStop, onIdle, idleTime = DEFAULT_TIME,
}) => {
  let countdown;
  const addElementEvents = addEvents(element);
  if (onStart) addElementEvents(EVENTS.start, onStart);
  if (onMove) addElementEvents(EVENTS.move, onMove);
  if (onStop) addElementEvents(EVENTS.stop, onStop);
  if (onIdle) {
    addElementEvents(ALL_EVENTS, () => {
      clearTimeout(countdown);
      countdown = setTimeout(onIdle, idleTime);
    });
    countdown = setTimeout(onIdle, idleTime);
  }
};
