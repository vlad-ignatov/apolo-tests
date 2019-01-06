//// <reference path="./types.d.ts" />

import * as React    from "react"
import * as ReactDOM from "react-dom"
import {
    DropZoneProps,
    DropZoneState,
    FileValidationResult
} from "./types"
import "./DropZone.less"

import {
    roundToPrecision,
    readableFileSize,
    intVal,
    floatVal,
    uInt,
    uFloat,
    gcd,
    getRatio
} from "../../lib"

function Loader() {
    return null;
}

// export interface DropZoneFileProps {
//     file: File;
//     onRemove: () => any;
//     onSubmit: () => any;
// }

// export class DropZoneFile extends React.Component<any, any>
// {
//     public static propTypes = {
//         file    : React.PropTypes.instanceOf(File).isRequired,
//         onRemove: React.PropTypes.func.isRequired,
//         onSubmit: React.PropTypes.func.isRequired
//     };

//     public componentDidMount()
//     {
//         if (this.props.file) {
//             this.loadFile(this.props.file);
//         }
//     }

//     public componentDidUpdate(prevProps)
//     {
//         if (this.props.file && this.props.file !== prevProps.file) {
//             this.loadFile(this.props.file);
//         }
//     }

//     public render()
//     {
//         let { file } = this.props
//         return (
//             <div className="list-group-item drop-zone-file">
//                 <div className="image-col" style={{ width: 120, height: 100, background: "#EEE" }}>

//                 </div>
//                 <div className="table-col">
//                     <table className="small">
//                         <tbody>
//                             <tr>
//                                 <th className="text-right">Name:</th>
//                                 <td>{ file.name }</td>
//                                 <td className="text-right"><i className="fa fa-check text-success"/></td>
//                             </tr>
//                             <tr>
//                                 <th className="text-right">Size:</th>
//                                 <td>1.4MB</td>
//                                 <td className="text-right"><i className="fa fa-check text-success"/></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <div className="row">
//                         <div className="col-4">
//                             <button className="btn btn-sm btn-success btn-block">Upload</button>
//                         </div>
//                         <div className="col-4">
//                             <div className="progress">
//                                 <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
//                             </div>
//                         </div>
//                         <div className="col-4">
//                             <button
//                                 className="btn btn-sm btn-danger btn-block"
//                                 type="button"
//                                 onClick={this.props.onRemove}
//                             >Remove</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     private loadFile(file) {
//         let reader = new FileReader();

//         // Closure to capture the file information.
//         reader.onload = event => {
//         //     // this.refs.img.onload = () => {
//         //     //     this.validate(f, this.refs.img);
//         //     // };
//         //     this.setState({
//         //         imageUrl: (event.target as any).result,
//         //         loading : false
//         //     });
//         };

//         // // Read in the image file as a data URL.
//         reader.readAsDataURL(file);
//     }
// }

////////////////////////////////////////////////////////////////////////////////



export default class DropZone extends React.Component<DropZoneProps, DropZoneState>
{
    public static propTypes = {
        // The max. possible file size in MB
        maxFileSize: React.PropTypes.number,

        // The minimal acceptable image width
        minImageWidth: React.PropTypes.number,

        // The minimal acceptable image width
        minImageHeight: React.PropTypes.number,

        // The accepted mime types as comma-separated list
        accept: React.PropTypes.string,

        // The desired aspect ratio
        ratio: React.PropTypes.string
    };

    public static defaultProps: DropZoneProps = {
        // altText       : null,
        maxFileSize   : 2,
        // label         : "Select an image",
        accept        : "image/png,image/jpg,image/jpeg,image/gif",
        ratio         : null,
        minImageWidth : null,
        minImageHeight: null
    };

    public constructor(props)
    {
        super(props);
        this.state = {
            dragOver: false,
            files: [
                // { name: " File 1" }
            ]
        };
        this.onChange = this.onChange.bind(this)
    }

    public renderErrorCheck(state)
    {
        if (!state) {
            return <i className="fa fa-clock-o text-warning" title="Loading..."/>
        }

        if (state.error) {
            return <i className="fa fa-minus-circle text-danger" title={ state.error }/>
        }

        return <i className="fa fa-check text-success"/>
    }

    public renderFiles()
    {
        return this.state.files.map((file, i) => {
            const isError = file.validation.hasError
            return (
                <div className={`list-group-item drop-zone-file${isError ? " list-group-item-warning" : ""}`} key={`file-${i}`}>
                    <div className="image-col" style={{
                        width: 120,
                        minWidth: 120,
                        minHeight: 100,
                        backgroundImage: file.url ? `url('${file.url}'), linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))` : "linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))"
                    }}/>
                    <div className="table-col">
                        <table className="small">
                            <tbody>
                                <tr>
                                    <th className="text-right">Name:</th>
                                    <td>{ file.name }</td>
                                    <td className="text-right">
                                        <i className="fa fa-check text-success"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-right">Dimensions:</th>
                                    <td>{ file.width && file.height ? `${file.width}x${file.height}` : "Loading..." }</td>
                                    <td className="text-right">
                                        { this.renderErrorCheck(file.validation.dimensions) }
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-right">Size:</th>
                                    <td>{ readableFileSize(file.size) }</td>
                                    <td className="text-right">
                                        { this.renderErrorCheck(file.validation.filesize) }
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-right">Aspect&nbsp;Ratio:</th>
                                    <td>{ file.width && file.height ? getRatio(file.width, file.height) : "Loading..." }</td>
                                    <td className="text-right">
                                        { this.renderErrorCheck(file.validation.ratio) }
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-right">Mime&nbsp;Type:</th>
                                    <td>{ file.type }</td>
                                    <td className="text-right">
                                        { this.renderErrorCheck(file.validation.mime) }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-4">
                                <button
                                    className="btn btn-sm btn-light btn-block text-success border-success"
                                    disabled={isError}
                                >
                                    <i className="fa fa-cloud-upload"/> Upload
                                </button>
                            </div>
                            <div className="col-4">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div className="col-4">
                                <button
                                    className="btn btn-sm btn-light btn-block text-danger border-danger"
                                    type="button"
                                    onClick={ () => this.setState({
                                        files: this.state.files.filter(f => f !== file)
                                    }) }
                                >
                                    <i className="fa fa-trash-o"/> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    public render()
    {
        let className = ["drop-zone", "card"];
        if (this.state.dragOver) {
            className.push("drag-over");
        }

        return (
            <div
                className={ className.join(" ") }
                // onDragEnter={ this.onDragEnter }
                onDragLeave={ this.onDragLeave }
                onDragOver={ this.onDragEnter }
                onDragEnd={ this.onDragLeave }
                onDrop={ this.onDragLeave }
            >
                <div className="card-header">
                    <div className="row">
                        <div className="col-9">
                            <input
                                className="form-control form-control-sm"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={ this.onChange }
                                defaultValue=""
                                multiple
                            />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-sm btn-block btn-primary">Upload All</button>
                        </div>
                    </div>
                </div>
                <div className="card-body text-info">
                    Select files...
                </div>
                <div className="list-group list-group-sm list-group-flush">
                    { this.renderFiles() }
                </div>
            </div>
        );
    }

    private onChange(event)
    {
        let files = event.target.files, filesToAdd = [];
        for (let i = 0, l = files.length; i < l; i++) {
            let f = files[i];
            if (f.type.match("image.*")) {
                let fileState = {
                    name            : f.name,
                    lastModified    : f.lastModified,
                    lastModifiedDate: f.lastModifiedDate,
                    size            : f.size,
                    type            : f.type,
                    validation      : {},
                    url             : null,
                    width           : null,
                    height          : null
                };
                filesToAdd.push(fileState);
                console.log(f)
                let reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (event: any) => {
                    let img = new Image();
                    img.onload = () => {
                        fileState.url        = img.src
                        fileState.width      = img.naturalWidth
                        fileState.height     = img.naturalHeight
                        fileState.validation = this.validate(f, img);
                        // this.validate(f, this.refs.img);
                        this.forceUpdate()
                    };
                    img.src = event.target.result
                    // this.setState({
        //         //         imageUrl: (event.target as any).result,
        //         //         loading : false
        //         //     });
                };

        //         // // Read in the image file as a data URL.
                reader.readAsDataURL(f)

                // this.setState({ blob: null })
            }
        }
        this.setState({
            files: [...this.state.files, ...filesToAdd]
        })
    }

    private onDragEnter = event => {
        // if (event.target == ReactDOM.findDOMNode(this)) {
            event.stopPropagation();
            event.preventDefault();
            event.persist();
            console.log(event.nativeEvent.dataTransfer.files.length)
            console.log(event.nativeEvent.dataTransfer.types)
            this.setState({
                dragOver: true
            });
        // }
    };

    private onDragLeave = event => {
        // if (event.target == ReactDOM.findDOMNode(this)) {
            // event.stopPropagation();
            this.setState({
                dragOver: false
            });
        // }
    };

    /**
     * This is called for each loaded image file
     * @param file The File object
     * @param img  The image object used to read dimensions from
     */
    private validate(file: File, img: HTMLImageElement): FileValidationResult
    {
        let { maxFileSize, minImageWidth, minImageHeight } = this.props;

        let result: FileValidationResult = {
            filesize  : {},
            dimensions: {},
            mime      : {},
            ratio     : {},
            hasError  : false
        };


        // filesize
        result.filesize.value = readableFileSize(file.size);
        let maxBytes = maxFileSize * 1024 * 1024;
        if (maxBytes && file.size > maxBytes) {
            result.filesize.error = `The maximum file size allowed is ${maxFileSize}MB`;
            result.hasError = true;
        }

        // dimensions
        result.dimensions.width  = img.naturalWidth
        result.dimensions.height = img.naturalHeight
        let minWidth  = uInt(minImageWidth );
        let minHeight = uInt(minImageHeight);
        if (minWidth && (result.dimensions.width < minWidth || result.dimensions.height < minHeight)) {
            result.dimensions.error = `The minimal image dimensions are ${minWidth}x${minHeight}px`;
            result.hasError = true;
        }

        // mime type
        let accept = this.props.accept;
        result.mime.value = file.type;
        if (accept) {
            let types = String(accept).toLowerCase().split(",");
            if (types.indexOf(String(file.type).toLowerCase()) < 0) {
                result.mime.error = "This is not a supported file type";
                result.hasError = true;
            }
        }

        // aspect ratio
        let ratio = String(this.props.ratio || "").split("/");
        result.ratio.value = getRatio(img.naturalWidth, img.naturalHeight);
        if (ratio.length == 2) {
            let w = uInt(ratio[0]);
            let h = uInt(ratio[1]);
            if (w > 0 && h > 0) {
                let q = w / h;
                let imgRatio = img.naturalWidth / img.naturalHeight;
                if (imgRatio !== q) {
                    result.hasError = true;
                    result.ratio.error = `The aspect ratio must be ${w}/${h},
                        otherwise the image will be cropped or stretched
                        to fit as you see it in the preview.`;
                }
            }
        }

        return result
    }
}


// export default class ImagePicker extends React.Component<any, any> {

//     // The label to be displayed above the input
//     public static propTypes = {

//         // Visual props
//         // ---------------------------------------------------------------------

//         // The default image URI - will be rendered as a "placeholder" in case
//         // no "currentImage" is passed
//         defaultImage: React.PropTypes.string,

//         label: React.PropTypes.string
//     };

//     public static defaultProps = {
//         // altText       : null,
//         maxFileSize   : 2,
//         label         : "Select an image",
//         accept        : "image/png,image/jpg,image/jpeg,image/gif",
//         defaultImage  : "about:blank"
//         // ratio         : null,
//         // minImageWidth : null,
//         // minImageHeight: null
//     };

//     // public refs = {
//     //     img: HTMLImageElement
//     // };

//     public constructor(args) {
//         super(args)
//         this.state = {
//             loading          : this.props.currentImage !== undefined,
//             dragOver         : false,
//             inputType        : "file",
//             loadingImage     : false,
//             loadingImageError: false,
//             remoteImage      : "",
//             blob             : null,
//             imageUrl         : this.props.defaultImage
//         };

//         this.onChange = this.onChange.bind(this);
//     }

//     public renderSupportedTypesList() {
//         let out = this.props.accept.split(/\s*,\s*/), len = out.length
//         return out.map((type, i) => (
//             <span key={type}>
//                 <code>{ type.replace(/^image\//, "") }</code>
//                 { i === len - 1 ? null : ", " }
//             </span>
//         ))
//     }

//     public loadImageFromURL(url) {}

//     public render() {
//         return (
//             <div className="card">
//                 { this.props.header && (
//                     <div className="card-header">
//                         <b>{this.props.header}</b>
//                     </div>
//                 )}
//                 <div className="card-body">
//                     <img
//                         src={this.state.imageUrl}
//                         style={{
//                             width: "100%"
//                         }}
//                     />
//                     <div className="text-right small">
//                         <label>{ this.props.label }&nbsp;</label>
//                         <div className="btn-group btn-group-sm text-right">
//                             <button
//                                 type="button"
//                                 className={ "btn " + (this.state.inputType == "file" ? "btn-success active" : "btn-default") }

//                                 onClick={() => this.setState({ inputType: "file" })}>
//                                 File
//                             </button>
//                             <button
//                                 type="button"
//                                 className={ "btn " + (this.state.inputType == "url" ? "btn-success active" : "btn-default") }

//                                 onClick={() => this.setState({ inputType: "url" })}>
//                                 URL
//                             </button>
//                         </div>
//                     </div>
//                     {
//                         this.state.inputType == "url" ?
//                         <div className={ "input-group input-group-sm" + (this.state.loadingImageError ? " has-error" : "") }>
//                             <input
//                                 className="form-control input-sm"
//                                 type="text"
//                                 // name="image"
//                                 value={ this.state.remoteImage }
//                                 placeholder="Image URL"
//                                 ref="imageUrl"
//                                 onKeyDown={ (e: any) => {
//                                     if (e.keyCode == 13) {
//                                         e.preventDefault();
//                                         this.loadImageFromURL(e.target.value);
//                                     }
//                                 }}
//                                 onChange={ e => this.setState({ remoteImage: e.target.value })}
//                             />
//                             <span className="input-group-btn">
//                                 <button
//                                     className="btn btn-default btn-sm"
//                                     type="button"
//                                     onClick={ () => this.loadImageFromURL(this.state.imageUrl) }>
//                                     { this.state.loadingImage ? <Loader/> : "Go" }
//                                 </button>
//                             </span>
//                         </div> :
//                         <input
//                             className="form-control form-control-sm"
//                             type="file"
//                             name="image"
//                             accept="image/*"
//                             onChange={ this.onChange }
//                             defaultValue=""
//                         />
//                     }
//                     <p className="text-muted small" style={{ margin: "10px 0px 15px" }}>
//                         <i className="fa fa-info-circle"></i>
//                         <span>
//                             &nbsp;Select an image file not larger than
//                             <b> { this.props.maxFileSize }MB</b>. The supported
//                             file formats are { this.renderSupportedTypesList() }.
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         )
//     }

//     private onChange(e: any) {
//         e.persist();
//         this.setFiles(e.target.files);
//     }

//     private setFiles(files: File[] = []) {
//         for (let i = 0, l = files.length; i < l; i++) {
//             let f = files[i];
//             if (f.type.match("image.*")) {
//                 let reader = new FileReader();

//                 // Closure to capture the file information.
//                 reader.onload = event => {
//                     // this.refs.img.onload = () => {
//                     //     this.validate(f, this.refs.img);
//                     // };
//                     this.setState({
//                         imageUrl: (event.target as any).result,
//                         loading : false
//                     });
//                 };

//                 // Read in the image file as a data URL.
//                 reader.readAsDataURL(f)

//                 this.setState({ blob: null })

//                 break;
//             }
//         }
//     }
// }