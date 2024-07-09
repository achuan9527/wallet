import "./i18n";
import { useTranslation } from "react-i18next";
import styles from "./App.module.scss";
import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';
function App() {
  const { t } = useTranslation();
  const clientRef = useRef<PublicClient>(null) as React.MutableRefObject<PublicClient | null>;
  useEffect(() => {
    const client = createPublicClient({
      chain: mainnet,
      transport: http(),
    });
    clientRef.current = client;
    (async () => {
      const [blockNumber, block, blockWithNumber, blockSafe, blockWithHash] =
        await Promise.all([
          client.getBlockNumber(),
          client.getBlock(),
          client.getBlock({ blockNumber: 6942069n }),
          client.getBlock({ blockTag: 'safe' }),
          client.getBlock({
            blockHash:
              '0xe9577fb1db37cb137c7a4a70666d2923b1b0a245befe3bf04d3ead3cc261ac0d',
          }),
        ])
      setData({
        blockNumber,
        block,
        blockWithNumber,
        blockSafe,
        blockWithHash,
      });
      console.log('blockNumber', blockNumber);
      console.log('block', block);
      console.log('blockWithNumber', blockWithNumber);
      console.log('blockSafe', blockSafe);
      console.log('blockWithHash', blockWithHash);
      // 获取余额度
      const balance = await client.getBalance({
        address: '0x8b9f9f4a7b3e0e6e2e2d3f62e5f2f6f5e0b9c3a6',
      });
      console.log('balance', balance, balance.toString());
      
    })();
  }, [])
  const [data, setData] = useState({});
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
