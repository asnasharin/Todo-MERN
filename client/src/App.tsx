import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="dark:bg-gray-800 bg-white">
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
          </Routes>
        </Provider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "black",
                color: "white",
              },
            },
            error: {
              style: {
                background: "black",
                color: "white",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
