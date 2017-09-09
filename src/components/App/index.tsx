import * as React  from "react"
import NavBar      from "../NavBar"
import ProjectList from "../ProjectList"
import "./app.less"

import {
    ApolloClient,
    graphql,
    gql,
    ApolloProvider,
    createNetworkInterface
} from "react-apollo"

const networkInterface = createNetworkInterface({ 
    uri: 'http://localhost:4000/graphql',
  });

const apolloClient = new ApolloClient({
    networkInterface
});


export default class App extends React.Component<any, any> {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <div>
                    <NavBar/>
                    <div className="container">
                        <div className="row">
                            <div className="col-4 border-right">
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small>3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <small>Donec id elit non mi porta.</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">List group item heading</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <small className="text-muted">Donec id elit non mi porta.</small>
                                    </a>
                                </div>
                            </div>
                            <div className="col-8">
                                <ProjectList/>
                            </div>
                        </div>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}
