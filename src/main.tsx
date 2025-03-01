import { createRoot } from 'react-dom/client'
import './index.css'
import {AppWithRedux} from './AppWithRedux.tsx';

createRoot(document.getElementById('root')!).render(<AppWithRedux />)
