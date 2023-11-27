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
    onRegisteredSW(swUrl, registration) {
      setMessage(`SW registration success ${swUrl}`);
      if (registration) {
        // 一定間隔でサービスワーカーファイルの更新をチェックする
        setInterval(async () => {
          if (!(!registration.installing && navigator)) return;
          if ("connection" in navigator && !navigator.onLine) return;
          console.log("check update...");
          registration.update(); // 更新があれば needRefresh が　true になる
        }, intervalMS);
      }
    },
    onRegisterError(error) {
      setMessage(`SW registration error ${error}`);
    },
  });

  const handleOk = async () => {
    await updateServiceWorker(true);
    window.location.reload();
  };

  return (
    <>
      <p>current version is `{import.meta.env.VITE_VERSION ?? "undefined"}`</p>
      <p>{message}</p>
      {needRefresh && (
        <button onClick={handleOk}>ここをクリックして更新してください</button>
      )}
    </>
  );
}

export default App;
