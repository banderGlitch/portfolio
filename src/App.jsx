import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1>Hello World</h1>
      </div>
    </Provider>
  )
}

export default App
