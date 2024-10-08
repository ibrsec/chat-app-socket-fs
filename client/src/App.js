import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import AppRouter from "./router/AppRouter";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  return (
    <div className="App p-2 h-screen flex items-start pt-10 justify-center">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketContextProvider>
            <AppRouter />
          </SocketContextProvider>
        </PersistGate>
      </Provider>
      <Toaster />
    </div>
  );
}

export default App;
