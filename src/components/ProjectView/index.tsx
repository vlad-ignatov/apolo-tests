import * as React from "react"
import { Link } from "react-router-dom"

export default class ProjectView extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <h1>
                    Project View
                </h1>
                <small className="pull-right">
                    <Link to={`/projects/${this.props.match.params.id}/edit`}>Edit</Link>
                </small>
            </div>
        )
    }
}