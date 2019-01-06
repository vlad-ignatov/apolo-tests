export interface FileValidationResult {
    filesize: {
        value ?: string
        error ?: Error | string
    },
    dimensions: {
        width ?: number
        height?: number
        error ?: Error | string
    },
    mime: {
        value ?: string
        error ?: Error | string
    },
    ratio: {
        value ?: string
        error ?: Error | string
    },
    hasError?: boolean
}

export interface DropZoneState {
    dragOver   ?: boolean
    files      ?: any[]
}

export interface DropZoneProps {
    // altText       : null,
    maxFileSize   ?: number;
    // label         ?: "Select an image",
    accept        ?: string;
    ratio         ?: string;
    minImageWidth ?: number;
    minImageHeight?: number;
}