import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
