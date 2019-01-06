import * as React from "react"
import { graphql, gql } from "react-apollo"
import DropZone from "../ImagePicker"


const projectsQuery = gql`query technologiesQuery {
    technologies {
        id
        name
    }
}`;

class ProjectEdit extends React.Component<any, any> {

    public onSubmit(event) {
        event.preventDefault();
    }

    public render() {
        let { loading, error, technologies } = this.props.data

        if (loading) {
            return <p>Loading...</p>
        }

        if (error) {
            return <p>{error.stack || error.message}</p>
        }

        return (
            <div>
                <h1><i className="fa fa-pencil-square-o"/> Edit Project</h1>
                <hr/>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputName">Project Name</label>
                        <input type="text" className="form-control" id="inputName" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDescription">Short Description</label>
                        <textarea rows={4} name="description" className="form-control" id="inputDescription"/>
                    </div>
                    <div className="form-group">
                        <br/>
                        <h5>Images</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-12">
                                <DropZone>
                                    <br/>
                                    <br/>
                                </DropZone>
                            </div>
                        </div>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/> Hidden
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <br/>
                            <h5>Technologies</h5>
                            <hr/>
                            { technologies.map(t => (
                                <div key={t.id}>
                                    <label>
                                        <input type="checkbox"/> {t.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-6">
                            <br/>
                            <h5>Tools</h5>
                            <hr/>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        )
    }
}

export default graphql(projectsQuery)(ProjectEdit)