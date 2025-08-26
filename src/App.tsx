import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AlertProvider } from './Context/AlertContext';
import { DateProvider } from './Context/DateContext';
import './Context/i18n';
import LanguageProvider from './Context/LanguageContext';
import { ModalProvider } from './Context/ModalContext';
import { ThemeProvider } from './Context/ThemeContext';
import { Router } from './Routers/Router';

const App: FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <DateProvider>
          <ModalProvider>
            <AlertProvider>
              <BrowserRouter>
                <Router/>
              </BrowserRouter>
            </AlertProvider>
          </ModalProvider>
        </DateProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App;
