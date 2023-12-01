import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import './App.css';

const intervalMS = 1 * 1000;

function App() {
  const [message, setMessage] = useState('No message.');

  useRegisterSW({
    onNeedRefresh() {
      console.log('New version available');
      setMessage('New version available');
    },
    onRegisteredSW(swUrl, registration) {
      setMessage(`SW registration success ${swUrl}`);
      if (registration) {
        // 一定間隔でサービスワーカーファイルの更新をチェックする
        setInterval(async () => {
          if (!navigator.onLine) return;
          console.log('check update...');

          // 更新があれば needRefresh が　true になる
          // 更新がある = ワーカーのスクリプト URL を読み取り、新しいワーカーが現在のワーカーとバイト単位で同一でないと判定される
          registration.update();
        }, intervalMS);
      }
    },
    onRegisterError(error) {
      setMessage(`SW registration error ${error}`);
    },
  });

  return (
    <>
      <p>current version is `{import.meta.env.VITE_VERSION ?? 'undefined'}`</p>
      <p>{message}</p>
    </>
  );
}

export default App;
