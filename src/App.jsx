import { store } from "./store/store"
import { Provider } from "react-redux"
import Movie from "./movie"

function App() {

  return (
    <div>
      <Provider store={store}>
        <Movie/>
      </Provider>
    </div>
  )
}

export default App
