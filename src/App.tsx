import "./i18n";
import { useTranslation } from "react-i18next";
import styles from "./App.module.scss";
import { createWalletClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from "viem/accounts";
function App() {
  const { t } = useTranslation();
  const clientRef = useRef<PublicClient>(null) as any; // 我的钱包客户端
  useEffect(() => {

      // 生成账户
      const account = privateKeyToAccount("0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef");
      const client = createWalletClient({
        account,
        chain: mainnet,
        transport: http()
      })
      clientRef.current = client;

  }, [])
  return (
    <>
      <div> {t("common.hello")}</div>
      <div className={styles.testStyles}>
        react + ts + zustand + i18n + vite + ahook
      </div>
      <div>

        <input type="text" />
        <div>
          <div>
            {/* {JSON.stringify(data, null, 2)} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
