import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, Switch, useHistory } from 'react-router-dom';
import Menu from './views/menu/menu';
import FoodDetail from './views/food-detail/foodDetail';
import './App.styles.scss';
import ToBuyList from './views/to-buy-list/toBuyList.component';
import { observer } from 'mobx-react-lite';
import NavFooter from './components/nav-footer/nav-footer.component';
import Header from './components/header/header.component';
import { NavPath } from './utils/nav-path';
import Settings from './views/settings/settings.component';
import { useStore } from './store/root-store';
import SignUp from './components/sign-up/sign-up.component';
import Login from './components/log-in/log-in.component';
import Loader from './components/loader/loader';
import FoodManage from './views/food-manage/food-manage';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import FoodAdd from './components/food-add/food-add';

const App: React.FC = () => {
    const { foodStore, userStore } = useStore();
    const { userLoading, loadAuthenticatedUser, isAuthenticated } = userStore;
    const history = useHistory();
    useEffect(() => {
        // userStore.authenticate("Raymond", "123");
        loadAuthenticatedUser();
        // debugger;
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            foodStore.initializeFoodThisWeek();
        }
    }, [foodStore, isAuthenticated])

    /**
 * Returns a redirect to login page with the current path in its state
 * User will be redirected to current path after loging in
 */
    const getRedirectToLogin = (props: RouteComponentProps) => (
        <Redirect
            push
            to={{
                pathname: NavPath.Login,
                state: { fromPathName: props.location.pathname }
            }}
        />
    );


    return !userLoading ? (
        <React.Fragment>
            <Header />

            <MDBBtn className="to-buy-btn" size='lg' floating tag='a' onClick={() => history.push('/to-buy-list')}>
                <MDBIcon fas icon="cart-arrow-down" />
            </MDBBtn>

            <div className="main" >
                <Switch>
                    <Route
                        exact
                        path={'/' + NavPath.Menu}
                        render={props => isAuthenticated ? <Menu /> : getRedirectToLogin(props)} />
                    <Route path={`/${NavPath.FoodDetails}/:foodId`} component={FoodDetail} />
                    <Route
                        path={`/${NavPath.ToBuyList}`}
                        render={props => isAuthenticated ? <ToBuyList /> : getRedirectToLogin(props)} />
                    <Route
                        path={`/${NavPath.Settings}`}
                        render={props => isAuthenticated ? <Settings /> : getRedirectToLogin(props)} />
                    <Route
                        exact
                        path={`/${NavPath.FoodManage}`}
                        render={props => isAuthenticated ? <FoodManage /> : getRedirectToLogin(props)} />
                    <Route
                        path={`/${NavPath.FoodAdd}`}
                        render={props => isAuthenticated ? <FoodAdd /> : getRedirectToLogin(props)} />
                    <Route
                        exact
                        path={'/' + NavPath.SignUp}
                        render={() => !isAuthenticated
                            ? <SignUp />
                            : <Redirect
                                push
                                to={{ pathname: NavPath.Menu }} />}
                    />
                    <Route
                        exact
                        path={'/' + NavPath.Login}
                        render={() => !isAuthenticated
                            ? <Login />
                            : <Redirect
                                push
                                to={{
                                    pathname: NavPath.Menu
                                }} />}
                    />
                    <Redirect from="/" to={NavPath.Menu} />
                </Switch>
            </div>
            {isAuthenticated ? <NavFooter /> : null}
        </React.Fragment>
    ) : <Loader />
}

export default observer(App)
