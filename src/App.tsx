import "./i18n";
import { useTranslation } from "react-i18next";
import styles from "./App.module.scss";
import { createWalletClient, http, PublicClient, publicActions, walletActions } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from "viem/accounts";
import { mnemonicToAccount } from 'viem/accounts'

function App() {
  const { t } = useTranslation();
  const clientRef = useRef<PublicClient>(null) as any; // 我的钱包客户端
  useEffect(() => {
    //  生成助记词方法 const mnemonic = generateMnemonic(english)

    // 通过助记词生成账户
    const account = mnemonicToAccount('legal winner thank year wave sausage worth useful legal winner thank wow')
    // const account = mnemonicToAccount('legal winner thank year wave sausage worth useful legal winner thank yellow')

    // 私钥生成账户
    // const account = privateKeyToAccount("0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef");
    const client = createWalletClient({
      account,
      chain: mainnet,
      transport: http()
    })
      .extend(publicActions)
      .extend(walletActions)
    // 获取余额
    client.getBalance({
      address: account.address,
    }).then((balance) => {
      console.log('balance', balance.toString());
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
