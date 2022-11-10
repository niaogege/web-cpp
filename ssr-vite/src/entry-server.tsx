import App from "./App";
import './index.css'

function ServerEntry(props: any) {
  return (
    <App data={{ user: 'cpp' }} />
  );
}

export { ServerEntry };

export async function fetchData() {
  return { user: 'cpp' }
}