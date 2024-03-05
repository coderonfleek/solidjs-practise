
import {createStore, produce} from "solid-js/store";

const [appStore, setAppStore] = createStore({
    count : 0,
    user: {
        username: "Baddest",
        level: "Beginner",
        profile : {
            age : 50
        }
    },
    school : "Princeton",
    cars : [
        {"name": "CyberTruck", "manufacturer": "Tesla", "electric": true},
        {"name": "Model S", "manufacturer": "Tesla", "electric": true},
        {"name": "F-150", "manufacturer": "Ford", "electric": false},
        {"name": "Mustang Mach-E", "manufacturer": "Ford", "electric": true},
        {"name": "Camaro", "manufacturer": "Chevrolet", "electric": false}
    ]
});

const addCar = () => {
    setAppStore("cars", (cars) => [...cars, {name: "i3", manufacturer: "BMW", electric: true}])
}

//Update using .map()
const updateCar = () => {
    setAppStore("cars", (items) => items.map((item) => {
        return item.name == "CyberTruck"? {...item, name: "Tesla CyberTruck"} : item;
    }))
}

//Update using path syntax
const updateCar2 = () => {
    setAppStore("cars", (car) => car.name == "Camaro", "name", "Camaro T")
}

//Update using path and callback method of value (get access to previous value)
const toggleElectric = () => {
    setAppStore("cars", (car) => car.name == "F-150", "name", (electric) => !electric)
}

const deleteCar = () => {
    setAppStore("cars", (cars) => cars.filter((car) => car.name !== "Model S"))
}

const StoreDemo = () => {

    return <>
        <div>
            <h3>Count: {appStore.count}</h3>
            {/* Direct Property setting */}
            <button onClick={() => setAppStore("count", 10)}>Set 10</button>&nbsp;&nbsp;
            {/* Merge syntax */}
            <button onClick={() => setAppStore({"count": 15})}>Set 15</button>&nbsp;&nbsp;
            {/* Callback method with access to current value */}
            <button onClick={() => setAppStore("count", (c) => c + 1)}>Increment by 1</button>
        </div>
        <div>
            <h3>Age: {appStore.user.profile.age}</h3>
            {/* Path definition (Nested Update) */}
            <button onClick={() => setAppStore("user", "profile", "age", 30)}>Reduce Age</button>
        </div>
        <div>
            <h3>Count {appStore.count} | School: {appStore.school}</h3>
            {/* Multiple/Batch Updates */}
            <button onClick={() => setAppStore({"count" : 60, school: "Harvard"})}>Multiple Update</button>&nbsp;&nbsp;
            <h3>Username {appStore.user.username} | User Level: {appStore.user.level}</h3>
            {/* Multiple/Batch Updates */}
            <button onClick={() => setAppStore("user", {"username" : "OBO", level: "Intermediate"})}>Multiple Update 2</button>&nbsp;&nbsp;
            <button onClick={() => {
                setAppStore(produce((state) => {
                    state.count = 100;
                    state.user.profile.age = 37;
                    state.school = "MIT";
                    state.cars.push({name: "i3", manufacturer: "BMW", electric: true});
                }))
            }}>
                Using Produce for Multiple updates
            </button>
        </div>
        <div>
            <h3>Array Updates</h3>
            <ul>
                <For each={appStore.cars}>
                    {
                        (car, i) => <li><b>{car.name} - {car.manufacturer} </b>(<Show when={car.electric} fallback={"Fuel Engine"}>Electric</Show>)</li>
                    }
                </For>
            </ul>
            <button onClick={addCar}>Add Car</button>&nbsp;&nbsp;
            <button onClick={updateCar}>Update CyberTruck</button>&nbsp;&nbsp;
            <button onClick={updateCar2}>Update Camaro</button>&nbsp;&nbsp;
            <button onClick={toggleElectric}>Update Ford Type</button>&nbsp;&nbsp;
            <button onClick={deleteCar}>Remove Model S</button>
        </div>
    </>
}

export default StoreDemo;