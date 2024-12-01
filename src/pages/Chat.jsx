import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatBot from "./Chatbot";
function Chat() {
  const { role } = useSelector((state) => state.auth);

  return (
    <>

      <div className="master">

        <Routes>
          {role === "admin" && (
            <>
              <Route path="/" element={< ChatBot />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default Chat;
