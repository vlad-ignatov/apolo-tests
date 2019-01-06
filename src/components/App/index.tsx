import * as React  from "react"
import NavBar      from "../NavBar"
import ProjectList from "../ProjectList"
import ProjectView from "../ProjectView"
import ProjectEdit from "../ProjectEdit"
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom"
import {
    ApolloClient,
    graphql,
    gql,
    ApolloProvider,
    createNetworkInterface
} from "react-apollo"
import "./app.less"

const networkInterface = createNetworkInterface({
    uri: "http://localhost:4000/graphql",
  });

const apolloClient = new ApolloClient({
    networkInterface
});


export default class App extends React.Component<any, any> {
    public render() {
        return (
            <Router>
                <ApolloProvider client={apolloClient}>
                    <div>
                        <NavBar/>
                        <div className="container">
                            <div className="row card-columns">
                                <div className="col-12">
                                    <Route exact path="/" component={ProjectList}/>
                                    <Route exact path="/projects" component={ProjectList}/>
                                    <Route exact path="/projects/:id" component={ProjectView}/>
                                    <Route path="/projects/:id/edit" component={ProjectEdit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ApolloProvider>
            </Router>
        );
    }
}
