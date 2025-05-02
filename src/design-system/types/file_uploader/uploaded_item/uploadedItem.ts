import { MouseEventHandler } from "react";

export interface IUploadedItem {
    fileType?: 'file' | 'image' | 'video',
    fileName: string,
    fileSize?: string,
    state?: 'inprogress' | 'completed' | 'failed',
    percentageCompleted?: number,
    onDelete?: MouseEventHandler,
    uploadAgainHandler?: MouseEventHandler
}
