import { useMemo, useState } from 'react'
import { Loading, Provider } from '@shopify/app-bridge-react';
import { useLocation, useNavigate } from 'react-router-dom'

function App() {
  const location = useLocation();
  const [count, setCount] = useState(0)
  const config = {
    apiKey: 'fd3916b844cbc935b7358a3f28458ff6',
    host: new URLSearchParams(location.search).get("host"),
    forceRedirect: true
  }

  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate]
  );

  const routerConfig = useMemo(
    () => ({ history, location }),
    [history, location]
  );

  return (
    <Provider config={config} router={routerConfig}>
      <>
        <h1>Main Page 3</h1>
      </>
        <Loading />
    </Provider>
  )
  // return (
  //   <AppBridgeProvider>
  //     <button onClick={() => setCount((count) => count + 1)}>
  //       count is {count}
  //     </button>
  //   </AppBridgeProvider>
  // )
}

export default App
