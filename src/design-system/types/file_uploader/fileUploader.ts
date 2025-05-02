import { MouseEventHandler } from "react";

export interface IFileUploader {
    label?: string,
    labelHint?: string,
    hintText?: string,
    disabled?: boolean,
    allowedFormats?: string[],
    allowedSize?: number,
    previouslyUploadedFile?: string,
    onClickHandler?: MouseEventHandler,
    onUploadHandler?: (file?: File) => void,
    isServerError?: boolean,
}
