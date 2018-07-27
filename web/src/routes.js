import React from 'react'; //eslint-disable-line
import SimpleReactRouter from 'simple-react-router';

// Pages
import NotFoundContainer from './containers/NotFound.container.js';
import DashboardContainer from './containers/Dashboard.container.js';
import ReportContainer from './containers/Report.container.js';
import CategoryContainer from './containers/Category.container.js';

export default class Router extends SimpleReactRouter {
    routes(map) {
        map('/', DashboardContainer);
        map('/report', ReportContainer);
        map('/categories', CategoryContainer);
        map('/:path*', NotFoundContainer); // catchall route
    }
}
