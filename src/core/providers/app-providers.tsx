import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { persistor, store } from '../store/store';

interface AppProvidersProps {
    children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
                <Toaster  theme="dark" position="top-center" />
            </PersistGate>
        </ReduxProvider>
    );
}
