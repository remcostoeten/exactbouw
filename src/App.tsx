import AppProviders from '@/core/providers/app-providers';
import Checkout from '@/features/basket/components/checkout';
import { ROUTES } from '@/router/routes';
import { Route, Switch } from 'wouter';
import ProductList from './features/basket/components/product-list';

export default function App() {
    return (
        <div className="min-h-screen dark bg-background text-foreground">
            <AppProviders>
                <Switch>
                    <Route path={ROUTES.HOME} component={ProductList} />
                    <Route path={ROUTES.CHECKOUT} component={Checkout} />
                </Switch>
            </AppProviders>
        </div>
    );
}
