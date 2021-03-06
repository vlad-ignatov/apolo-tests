import * as React from "react"
import { Link } from "react-router-dom"
import { graphql, gql } from "react-apollo"


const projectsQuery = gql`query projectsQuery {
    projects {
        id
        name
        description
    }
}`;

interface Project {
    id: string
    name: string
    description: string
}

interface ProjectListProps {
    data: {
        loading: boolean
        error: Error
        projects: Project[]
    };
}


export class ProjectList extends React.Component<any, any> {
    public render() {
        let { loading, error, projects } = this.props.data
        if (loading) {
            return <p>Loading...</p>
        }
        if (error) {
            return <pre>{error.stack || error.message}</pre>
        }
        return (
            <div className="card-columns">
                {
                    projects.map(project => (
                        <div className="card" key={project.id}>
                            {/* <div className="card-header">{project.name}</div> */}
                            <div className="card-body">
                                <img className="card-img-top" src="" alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">{project.name}</h4>
                                    <p className="card-text">{project.description}</p>
                                </div>
                                {/* <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Cras justo odio</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>*/}
                                <div className="card-body">
                                    <Link to={`/projects/${project.id}`} className="btn btn-primary">Details</Link>
                                </div>
                            </div>
                            {/* <div className="card-footer text-center">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div> */}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default graphql(projectsQuery)(ProjectList);
