import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import "./App.css";

const intervalMS = 1 * 1000;

function App() {
  const [message, setMessage] = useState("No message.");

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      setMessage(`SW registration success ${swUrl}`);
      if (r) {
        // 一定間隔でサービスワーカーファイルの更新をチェックする
        setInterval(async () => {
          if (!(!r.installing && navigator)) return;
          if ("connection" in navigator && !navigator.onLine) return;
          console.log({ swUrl });
          r.update();
        }, intervalMS);
      }
    },
    onRegisterError(error) {
      setMessage(`SW registration error ${error}`);
    },
  });

  const handleOk = () => {
    updateServiceWorker(true);
  };

  return (
    <>
      <p>current version is `{import.meta.env.VITE_VERSION ?? "undefined"}`</p>
      <p>{message}</p>
      {needRefresh && <button onClick={handleOk}>更新してください</button>}
    </>
  );
}

export default App;
