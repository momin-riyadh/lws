import Counter from "./components/Counter";
import {Provider} from "react-redux";
import store from "./redux/store";


export default function App() {
    return (
        <Provider store={store}>
            <div className="w-screen h-screen p-10 bg-gray-100 text-slate-700">

            </div>
        </Provider>
    );
}
