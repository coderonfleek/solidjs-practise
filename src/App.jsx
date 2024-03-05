import Message from './components/Message';
import {createSignal, createEffect, Show, Index, Match, onMount} from "solid-js";
import InputComponent from './components/InputComponent';

import "./styles.css"
import UsersList from './components/UsersList';
import Timer from './components/Timer';
import { A } from '@solidjs/router';

const [count, setCount] = createSignal(0);

const [textVisible, setTextVisible] = createSignal(false);

const [countries, setCountries] = createSignal([
  "Nigeria",
  "Kenya",
  "Uganda",
  "Burkina Faso"
])

const [x, setX] = createSignal(7);

//setInterval(() => setCount(c => c + 1), 1000);

createEffect(() => {
  console.log(`Count is now ${count()}`);
})

const doubleOfIt = () => count() * 2;

const handleEvent = (event) => console.log(event);

const boxSize = 150;

const cancelled = false;

const blueBackground = "blueBg";
let inputRef;
function App() {

  let forwardedInputRef;
  onMount(() => {
    inputRef.focus();
  })

  return (
    <div>
      <A href='/' activeClass='blueBg'>Home</A> | <A href='/users'>Go to Users Page</A>
      <Message />
      <svg height="300" width="400">
        <defs>
          <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
            <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
          </linearGradient>
        </defs>
        <ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
        Sorry but this browser does not support inline SVG.
      </svg>

      <div>
        {count()} -- Double: {doubleOfIt()}
      </div>
      <button onClick={() => setCount(count () + 1)}>Increment + </button>

      <div>
        <Show when={textVisible()}
              fallback={
                <button onClick={() => setTextVisible(true)}>Show Text</button>
              }>
                <p>
                  <b>The Text is Now Visible</b>
                </p>
                <button onClick={() => setTextVisible(false)}>Hide Text</button>

        </Show>
      </div>
      <p>
        Countries with <b>For</b> (stable values, changing index - the index is the signal)
      </p>
      <For each={countries()}>
              {(country, i) => {
                return <li>[{i}]. {country}</li>
              }}
      </For>
      <p>
        Countries with <b>Index</b> (stable index, changing values - the value is the signal)
      </p>
      <Index each={countries()}>
              {(country, i) => {
                return <li>[{i}]. {country}</li>
              }}
      </Index>

      <p>Multiple Conditionals with <b>Switch</b> and <b>Match</b></p>
      <Switch fallback={<p>No Match Found</p>}>

        <Match when={x() >= 5}>
            <p>Things are getting hot here</p>
        </Match>
        <Match when={x() == 4}>
            <p>Heating up</p>
        </Match>
        <Match when={x() == 3}>
            <p>Let's step it up a little</p>
        </Match>

      </Switch>

      <p>Events</p>
      <button on:click={handleEvent}>Log Stuff</button>

      <p>Styling Components</p>
      <div style="width: 150px; height: 150px; background-color: blue; margin-bottom:15px">

      </div>

      <div style={{
        "height": `${boxSize}px`,
        width : `${boxSize}px`, //You can use direct property names (non-strings)
        "background-color": "red"
      }}></div>

      <div class={`box ${blueBackground} whiteColor`}> Hello, It's Me</div>

      <div class={cancelled ? 'strike' : 'italics'} >Wash the Dishes</div>

      <div classList={{
        "strike" : cancelled,
        "blueBg italics" : true
      }} >Wash the Dishes</div>

      <p>
        Refs
      </p>
      <div>
        <input type="text" ref={inputRef} />
        <br />
        <button onClick={() => {
          console.log(inputRef);
          inputRef.focus();
        }}>Save</button>
      </div>
      
      <p>
        Forwarded Refs
      </p>
      <div>
        
        <InputComponent forwardedRef={ref => forwardedInputRef = ref} />
        <button onClick={() => {
          console.log(forwardedInputRef);
          forwardedInputRef.focus();
        }}>Save</button>
      </div>

      <UsersList />

      
    </div>

    
  );
}

export default App;
