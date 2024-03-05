import { onCleanup, createEffect, createSignal } from "solid-js";

function Timer() {
  const [seconds, setSeconds] = createSignal(0); // Create a reactive signal for seconds
  let intervalId = null;

  onCleanup(() => {
    clearInterval(intervalId); // Clear the interval on cleanup
    console.log(`${intervalId} cleared`)
  });

  createEffect(() => {
    intervalId = setInterval(() => setSeconds((s) => s + 1), 1000); // Update seconds using the signal
  });

  return <div>Seconds elapsed: {seconds()}</div>; // Render seconds using the signal
}

export default Timer;