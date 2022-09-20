import qrcode from "qrcode-generator";
import { useState } from "react";
import "./App.css";

function App() {
  const typeNumber = 4;
  const errorCorrectionLevel = "L";
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.make();
  const [state, setState] = useState({
    email: "",
    username: "",
    githubName: "",
  });
  const [isCreated, setIsCreated] = useState(false);
  const handleChange = (e, key) => {
    const newValue = e.target.value;
    setState((prev) => {
      return { ...prev, [key]: newValue };
    });
  };
  const createQrCode = () => {
    if (!state.username || !state.email) {
      alert("please enter you username and email");
      return;
    }
    qr.addData(`
      email: ${state.email},
      username: ${state.username},
      github: ${state.githubName}
    `);
    setIsCreated(() => true);
  };

  return (
    <div>
      <h2>qrcode-badge-app</h2>
      <div className="form">
        <div>
          <div>email: </div>
          <div>username: </div>
          <div>github: </div>
        </div>
        <div className="input">
          <input
            type="text"
            value={state.email}
            onChange={(e) => handleChange(e, "email")}
          />
          <input
            type="text"
            value={state.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <input
            type="text"
            value={state.githubName}
            onChange={(e) => handleChange(e, "githubName")}
          />
        </div>
      </div>
      <div>
        <button onClick={createQrCode}>creatQrCode</button>
      </div>
      {isCreated && (
        <div dangerouslySetInnerHTML={{ __html: qr.createImgTag() }}></div>
      )}
    </div>
  );
}

export default App;
